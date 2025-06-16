import { defineStore } from 'pinia';

export const spotyStore = defineStore('store', {
  state: () => ({
    token: null,
    userProfile: {},
    artists: [],
    tracks: [],
    albums: [],
    genres: [],
    plailists: [],
    loading: false,
    trackShowing: {},
    player: null,
    deviceId: null,
    isPlaying: false,
    position: 0,
    duration: 0,
    volume: 0.01,
    term: 'long_term',
    albumShowing: {},
  }),
  actions: {
    setLoading(value) {
      this.loading = value;
    },

    LogOut() {
      localStorage.removeItem('spotify_token');
      localStorage.removeItem('spotify_token_expires');
      this.$reset();

      // const logoutWindow = window.open('https://accounts.spotify.com/logout', '_blank', 'width=500,height=600');
      // setTimeout(() => {
      //   logoutWindow?.close();
      // }, 2000);
    },
    
    async getAccessTokenFromUrl() {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      this.token = params.get("access_token");

      if (this.token) {
        localStorage.setItem('spotify_token', this.token);

        // Limpia la URL del hash
        window.history.replaceState(null, '', window.location.pathname);

        // Opcional: guarda la expiración si también tienes 'expires_in'
        const expiresIn = params.get("expires_in");
        if (expiresIn) {
          const expiryTime = Date.now() + Number(expiresIn) * 1000;
          localStorage.setItem("spotify_token_expires", expiryTime.toString());
        }

        await this.onInit();
      }
    },

     async setVolume(value) {
      if (!this.player) return;
      // Limitar volumen entre 0 y 1
      const volume = Math.min(Math.max(value, 0), 1);
      try {
        await this.player.setVolume(volume);
        this.volume = volume; // guardamos el volumen actual en el estado
      } catch (error) {
        console.error("Error setting volume:", error);
      }
    },

    async increaseVolume(step = 0.05) {
      const newVolume = this.volume + step;
      await this.setVolume(newVolume);
    },

    async decreaseVolume(step = 0.05) {
      const newVolume = this.volume - step;
      await this.setVolume(newVolume);
    },

    
    async togglePlayback() {
      if (!this.player) return;

      const state = await this.player.getCurrentState();
      if (!state) return;

      if (state.paused) {
        await this.player.resume();
        this.isPlaying = true;
      } else {
        await this.player.pause();
        this.isPlaying = false;
      }
    },
      
    async onInit() {
      this.setLoading(true);

      const token = localStorage.getItem("spotify_token");
      const expiryTime = localStorage.getItem("spotify_token_expires");

      if (!token || (expiryTime && Date.now() > Number(expiryTime))) {
        this.LogOut();
        return;
      }

      this.token = token;

      try {
        await this.getUserProfile();
        await this.getArtists();
        await this.getTracks();
        await this.getGenres();
        await this.getPlaylists();
        await this.getAlbums();
        await this.initPlayer();
        this.trackShowing = this.tracks?.items?.[0];
        await this.getAlbumDetails(this.albums?.[1]?.id);
      } catch (error) {
        console.error("Error en onInit:", error);
        this.LogOut();
      } finally {
        this.setLoading(false);
      }
    },

    async loadSpotifySDK() {
      if (document.getElementById('spotify-sdk')) return;

      const script = document.createElement('script');
      script.id = 'spotify-sdk';
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;
      document.head.appendChild(script);
    },
    
    async initPlayer() {
      await this.loadSpotifySDK();
       
      await new Promise(resolve => {
        if (window.Spotify) return resolve();
        window.onSpotifyWebPlaybackSDKReady = resolve;
      });

      this.player = new window.Spotify.Player({
        name: 'Vue Spotify Player',
        getOAuthToken: cb => cb(this.token),
        volume: this.volume
      });

      this.player.addListener('ready', ({ device_id }) => {
        this.deviceId = device_id;
      });

      this.player.addListener('player_state_changed', state => {
        if (!state) return;

        this.isPlaying = !state.paused;

        const sdkTrack = state.track_window.current_track;
        const matchedTrack = this.tracks?.items?.find(t => t.id === sdkTrack?.id);

        this.trackShowing = matchedTrack || {
          id: sdkTrack.id ?? '',
          name: sdkTrack.name ?? '',
          album: sdkTrack.album ?? {},
          uri: sdkTrack.uri ?? '',
          popularity: 0
        };

        this.position = state.position;
        this.duration = state.duration;
      });

      this.player.addListener('initialization_error', e => console.error(e));
      this.player.addListener('authentication_error', e => console.error(e));
      this.player.addListener('account_error', e => console.error(e));
      this.player.addListener('playback_error', e => console.error(e));

      const connected = await this.player.connect();
      if (!connected) console.error('Player failed to connect.');
    },

    async playTrack(trackUri) {
      if (!this.deviceId) {
        console.error("Device ID no disponible aún");
        return;
      }

      await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`, {
        method: 'PUT',
        body: JSON.stringify({
          uris: [trackUri]
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      });
    },

    async seekTo(positionInMs) {
      if (!this.player) return;
      await this.player.seek(positionInMs);
      this.position = positionInMs;
    },

    

    async getArtists() {
      const response = await fetch(`https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${this.term}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      this.artists = await response.json();
    },

    async getTracks() {
      const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${this.term}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      this.tracks = await response.json();
    },

    async getAlbums() {
      const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${this.term}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      });

      const data = await response.json();
      if (!data.items) return [];

      // 1) Agrupar álbumes para contar
      const albumMap = {};
      data.items.forEach(track => {
        const album = track.album;
        if (!albumMap[album.id]) {
          albumMap[album.id] = { id: album.id, count: 1 };
        } else {
          albumMap[album.id].count += 1;
        }
      });

      // 2) Obtener los 50 álbumes más frecuentes
      const topAlbumIds = Object.values(albumMap)
        .sort((a, b) => b.count - a.count)
        .slice(0, 50)
        .map(a => a.id);

      // 3) Traer info completa de esos álbumes en batches de 20
      const fetchAlbumBatch = async (ids) => {
        const res = await fetch(`https://api.spotify.com/v1/albums?ids=${ids.join(',')}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        const json = await res.json();
        return json.albums; // array de álbumes
      };

      const batches = [];
      for (let i = 0; i < topAlbumIds.length; i += 20) {
        const batchIds = topAlbumIds.slice(i, i + 20);
        batches.push(fetchAlbumBatch(batchIds));
      }

      const albumsDetailedArrays = await Promise.all(batches);
      const albumsDetailed = albumsDetailedArrays.flat();

      // 4) Mapear y añadir el count
      const albumsWithCount = albumsDetailed.map(album => ({
        id: album.id,
        name: album.name,
        images: album.images,
        artists: album.artists.map((a) => a.name).join(', '),
        release_date: album.release_date,
        total_tracks: album.total_tracks,
        label: album.label,
        genres: album.genres,
        count: albumMap[album.id]?.count ?? 0,
        external_urls: album.external_urls,
      }));

      this.albums = albumsWithCount;
    },

    async getAlbumDetails(albumId) {
      const res = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      const album = await res.json();

      // Calculamos duración total
      const totalMs = album.tracks.items.reduce((sum, track) => sum + track.duration_ms, 0);
      const totalMinutes = Math.floor(totalMs / 60000);
      const totalSeconds = Math.floor((totalMs % 60000) / 1000);
      const albumLength = `${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;

      // Guardamos el álbum completo en el estado
      this.albumShowing = {
        ...album,
        albumLength // agregamos duración al objeto
      };
    },

    async getGenres() {
      const allGenres = this.artists.items.flatMap(artist => artist.genres);

      const genreCount = allGenres.reduce((acc, genre) => {
        acc[genre] = (acc[genre] || 0) + 1;
        return acc;
      }, {});

      const totalGenres = allGenres.length;

      this.genres = Object.entries(genreCount)
        .sort(([, aCount], [, bCount]) => bCount - aCount)
        .slice(0, 50)
        .map(([genre, count]) => ({
          genre,
          count,
          percentage: Number(((count / totalGenres) * 100).toFixed(2))
        }));
    },

    async getPlaylists() {
      const response = await fetch("https://api.spotify.com/v1/me/playlists", {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      this.plailists = await response.json();
    },

    async getUserProfile() {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      this.userProfile = await response.json();
    }
  }
});