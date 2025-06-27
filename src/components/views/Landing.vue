<template>
  <div class="flex flex-col min-h-screen bg-black text-white landing bg-gradient-to-br from-green-600/20 to-black">
    <!-- Header -->
    <header class="fixed top-4 px-4 w-full h-16 lg:px-10 flex items-center z-50">
      <div class="flex items-center space-x-2 z-10">
        <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <!-- Icono Music -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 19V6l12-2v13" />
            <circle cx="6" cy="18" r="3" />
          </svg>
        </div>
        <span class="font-bold text-xl">
          <a href="#" aria-label="Ir al inicio">
          SpotifyStats
          </a>
        </span>
      </div>

      <nav class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-2 z-0">
        <a href="#mockups" aria-label="Ir a cómo funciona" class="p-2 bg-transparent backdrop-blur-md rounded-lg hover:bg-[#9b22b6] transition-all duration-300 ease-in-out">
          <span class="text-lg font-medium">Dispositivos</span>
        </a>
        <a href="#features" aria-label="Ir a cómo funciona" class="p-2 bg-transparent backdrop-blur-md rounded-lg hover:bg-[#9b22b6] transition-all duration-300 ease-in-out">
          <span class="text-lg font-medium">Características</span>
        </a>
        <a href="#how-it-works"  aria-label="Ir a features" class="p-2 bg-transparent backdrop-blur-md rounded-lg hover:bg-[#9b22b6] transition-all duration-300 ease-in-out">
          <span class="text-lg font-medium">Cómo funciona</span>
        </a>
      </nav>

      <InteractiveHoverButton :text="'Login'" class="ml-auto z-10" @click="loginWithSpotify()"/>
    </header>


    <main class="flex-1">
      <div>
        <!-- Hero Section -->
        <section class="w-full min-h-screen py-12 md:py-24 lg:py-32 xl:py-48 flex items-center relative">
          <div class="container px-4 md:px-6 mx-auto">
            <div class="flex flex-col items-center space-y-4 text-center">
              <div class="space-y-2 max-w-[1000px]">
                <span class="inline-block border border-green-500 text-green-400 rounded-full px-3 py-1 text-sm font-semibold">
                  Conecta con Spotify
                </span>
                <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl leading-none">
                  Descubre tus <span class="text-green-400">estadísticas musicales</span>
                </h1>
                <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl leading-non">
                  como
                  <TextHighlight class="bg-gradient-to-br from-[#9b22b6] to-[#c77dff]">
                    nunca antes
                  </TextHighlight>
                </h1>
                <p class="text-gray-300 md:text-xl">
                  Obtén insights profundos sobre tu música favorita, artistas más escuchados, géneros preferidos y mucho más con nuestras estadísticas personalizadas de Spotify.
                </p>
              </div>
              <div class="space-x-4 flex flex-wrap justify-center">
                <button @click="loginWithSpotify" class="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 gap-4 py-3 rounded inline-flex items-center text-lg hover:scale-105 transition-all">
                  <!-- Play icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right-dashed"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12h.5m3 0h1.5m3 0h6" /><path d="M15 16l4 -4" /><path d="M15 8l4 4" /></svg>
                  Conectar con Spotify
                </button>
              </div>
            </div>
          </div>
          <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </section>

        <!-- Mockups section -->
        <section id="mockups" class="w-full min-h-screen py-12 md:py-24 lg:py-32">
          <div class="container px-4 md:px-6 mx-auto">
            <div class="flex flex-col items-center justify-center space-y-4 text-center">
              <div class="space-y-2 max-w-[1000px]" ref="dispositivosWrapper">
                <h2  v-if="isDispositivosVisible" class="!text-2xl md:!text-4xl lg:!text-5xl font-bold tracking-tight animate__animated animate__bounceInLeft">
                  Disponible en todos tus <span class="text-[#c77dff]">dispositivos</span>
                </h2>
                <p class="text-gray-300 md:text-xl mt-2">
                  Accede a tus estadísticas desde cualquier lugar, ya sea en tu móvil o computadora.
                </p>
              </div>
            </div>

            <!-- Contenedor para posicionar las imágenes -->
            <div class="relative flex justify-center mt-12 max-w-7xl mx-auto">
              <div class="flex items-center w-full">
                <!-- Datos clave -->
                <div class="w-1/3 pr-8 text-left space-y-6">
                  <h3 class="text-3xl font-semibold mb-4">Números que importan</h3>
                  <div class="space-y-4 text-gray-400">
                    <div>
                      <strong class="text-[#c77dff] text-3xl">
                      +<NumberTicker :value="70" decimalPlaces="0" class="text-[#c77dff]" />M
                    </strong> 
                      <span class="text-lg">canciones accesibles</span>
                    </div>
                    <div>
                      <strong class="text-[#c77dff] text-3xl">
                        <NumberTicker :value="100" decimalPlaces="0" class="text-[#c77dff]" />k+
                      </strong> 
                      <span class="text-lg">llamadas a la API al mes</span>
                    </div>
                    <div>
                      <strong class="text-[#c77dff] text-3xl">
                        <NumberTicker :value="5" decimalPlaces="0" class="text-[#c77dff]" />K+
                      </strong> 
                      <span class="text-lg">usuarios activos mensuales</span>
                    </div>
                    <div>
                      <strong class="text-[#c77dff] text-3xl">
                        <NumberTicker :value="2.05" class="text-[#c77dff]" />s
                      </strong> 
                      <span class="text-lg">tiempo de respuesta promedio</span>
                    </div>
                  </div>
                </div>

                <!-- Imagen -->
                <img src="../../assets/images/mockups.png" alt="Vista en computadora" class="h-auto max-h-[450px] w-2/3 object-contain" />
              </div>
            </div>
          </div>
        </section>


        
        <!-- Features Section -->
        <section id="features" class="w-full min-h-screen py-12 md:py-24 lg:py-32">
        <!-- <section id="features" class="w-full min-h-screen py-12 md:py-24 lg:py-32 bg-gradient-to-br from-black to-[#9b22b6]/80"> -->
          <div class="container px-4 md:px-6 mx-auto">
            <div class="flex flex-col items-center justify-center space-y-4 text-center">
              <div class="space-y-2 max-w-[1000px]">
                <h2>
                  <div ref="letterPullupWrapper">
                    <LetterPullup
                      v-if="isVisible"
                      words="Estadísticas que te sorprenderán"
                      :delay="0.05"
                      class="!text-2xl md:!text-4xl lg:!text-5xl text-white font-bold tracking-tighter sm:text-5xl"
                    />
                  </div>
                </h2>
                <p class="text-gray-300 md:text-xl lg:text-base xl:text-xl leading-relaxed">
                  Descubre patrones ocultos en tu música y obtén insights que cambiarán la forma en que ves tu biblioteca musical.
                </p>
              </div>
            </div>
            <div class="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <!-- Feature Cards -->
              <div class="bg-transparent rounded-[10px] p-6 space-y-4 relative ">
                <GlowBorder
                  :color="['#1DB954', '#1ED760', '#9146FF', '#C17FFF']"
                  :border-radius="10"
                  :duration="10"
                  :border-width="2"
                  class="animate-glow"
                />
                <svg  xmlns="http://www.w3.org/2000/svg"  width="40"  height="40"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="text-green-400 icon icon-tabler icons-tabler-outline icon-tabler-music"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 17a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M13 17a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M9 17v-13h10v13" /><path d="M9 8h10" /></svg>
                <h3 class="text-white text-xl font-semibold">Top Artistas & Canciones</h3>
                <p class="text-gray-300">Descubre tus artistas y canciones más escuchados en diferentes períodos de tiempo.</p>
              </div>
  
              <div class="bg-gray-800 rounded-[10px] p-6 space-y-4">
                <!-- TrendingUp icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 17l6-6 4 4 8-8" />
                </svg>
                <h3 class="text-white text-xl font-semibold">Análisis de Géneros</h3>
                <p class="text-gray-300">Explora la diversidad de géneros musicales en tu biblioteca y cómo han evolucionado.</p>
              </div>
  
              <div class="bg-gray-800 rounded-[10px] p-6 space-y-4">
                <!-- Users icon -->
                <svg  xmlns="http://www.w3.org/2000/svg"  width="40"  height="40"  viewBox="0 0 24 24" class="text-green-400 icon icon-tabler icons-tabler-outline icon-tabler-users" fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>
                <h3 class="text-white text-xl font-semibold">Comparar con Amigos</h3>
                <p class="text-gray-300">Compara tus gustos musicales con tus amigos y descubre nuevas recomendaciones.</p>
              </div>
  
              <div class="bg-gray-800 rounded-[10px] p-6 space-y-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40" id="Festival--Streamline-Outlined-Material" height="40" width="40" class="text-green-400">
                  <desc>
                    Festival Streamline Icon: https://streamlinehq.com
                  </desc>
                  <path fill="currentColor" d="M3.541666666666667 36.66666666666667c0.6388916666666666 -1.8610833333333332 1.1250000000000002 -3.8750000000000004 1.4583333333333335 -6.041666666666667 0.33333333333333337 -2.166666666666667 0.5416666666666667 -4.555583333333334 0.625 -7.166666666666667 -1.1666666666666667 -0.36108333333333337 -2.1180583333333334 -1.0833333333333335 -2.8541666666666665 -2.166666666666667S1.6666666666666667 19 1.6666666666666667 17.666666666666668v-2.5c3.194441666666667 -1.1110833333333334 6.458333333333334 -2.7569166666666667 9.791666666666668 -4.9375C14.791666666666668 8.048608333333334 17.638916666666667 5.750000000000001 20 3.3333333333333335c2.361083333333333 2.4166666666666665 5.208333333333334 4.715275 8.541666666666668 6.895833333333334 3.3333333333333335 2.1805833333333333 6.59725 3.8264166666666672 9.791666666666668 4.9375v2.5c0 1.3333333333333335 -0.36108333333333337 2.5416666666666665 -1.0833333333333335 3.625 -0.7222500000000001 1.0833333333333335 -1.6666666666666667 1.8055833333333335 -2.8333333333333335 2.166666666666667 0.05558333333333333 2.5 0.2569166666666667 4.84725 0.6041666666666666 7.041666666666666 0.34725 2.194416666666667 0.84025 4.25 1.4791666666666667 6.166666666666667H3.541666666666667ZM7.916666666666667 15.166666666666666h24.166666666666668c-2.02775 -1.0277500000000002 -4.041666666666667 -2.2360833333333336 -6.041666666666667 -3.625 -2 -1.3889166666666668 -4.013916666666667 -2.986083333333333 -6.041666666666667 -4.791666666666667 -1.9166666666666665 1.72225 -3.8889166666666664 3.291666666666667 -5.916666666666667 4.708333333333334 -2.02775 1.4166666666666667 -4.083333333333334 2.65275 -6.166666666666667 3.7083333333333335Zm16.375 6.041666666666667c0.8889166666666667 0 1.6110833333333334 -0.3541666666666667 2.166666666666667 -1.0625 0.5555833333333333 -0.7083333333333334 0.8333333333333334 -1.53475 0.8333333333333334 -2.479166666666667H21.25c0 0.9444166666666667 0.28475 1.7708333333333335 0.8541666666666666 2.479166666666667 0.5694166666666667 0.7083333333333334 1.2985833333333334 1.0625 2.1875 1.0625Zm-8.541666666666668 0c0.8889166666666667 0 1.6110833333333334 -0.3541666666666667 2.166666666666667 -1.0625 0.5555833333333333 -0.7083333333333334 0.8333333333333334 -1.53475 0.8333333333333334 -2.479166666666667h-6.041666666666667c0 0.9444166666666667 0.28475 1.7708333333333335 0.8541666666666666 2.479166666666667 0.5694166666666667 0.7083333333333334 1.2985833333333334 1.0625 2.1875 1.0625Zm-8.541666666666668 0c0.8888916666666667 0 1.6110833333333334 -0.3541666666666667 2.166666666666667 -1.0625 0.5555833333333333 -0.7083333333333334 0.8333333333333334 -1.53475 0.8333333333333334 -2.479166666666667H4.166666666666667c0 0.9444166666666667 0.284725 1.7708333333333335 0.8541666666666666 2.479166666666667 0.5694416666666667 0.7083333333333334 1.2986083333333334 1.0625 2.1875 1.0625ZM6.875 34.16666666666667h5.541666666666667c0.22225 -1.4166666666666667 0.4166666666666667 -2.9583333333333335 0.5833333333333334 -4.625 0.16666666666666669 -1.6666666666666667 0.3194166666666667 -3.736083333333333 0.45833333333333337 -6.208333333333334 -0.3055833333333334 -0.13891666666666666 -0.65975 -0.3819166666666667 -1.0625 -0.7291666666666667 -0.40275 -0.34725 -0.6735833333333334 -0.6735833333333334 -0.8125 -0.9791666666666667 -0.47225 0.5555833333333333 -0.9930833333333333 1 -1.5625 1.3333333333333335 -0.5694166666666667 0.33333333333333337 -1.2014166666666668 0.5694166666666667 -1.8958333333333333 0.7083333333333334 -0.08333333333333334 2 -0.22916666666666669 3.854166666666667 -0.43750000000000006 5.5625S7.208333333333334 32.583333333333336 6.875 34.16666666666667ZM15 34.16666666666667h10.041666666666668c-0.22225 -1.4444166666666667 -0.40275 -3 -0.5416666666666667 -4.666666666666667 -0.13891666666666666 -1.6666666666666667 -0.2639166666666667 -3.625 -0.375 -5.875 -0.9166666666666667 -0.05558333333333333 -1.7569166666666667 -0.28475 -2.5208333333333335 -0.6875 -0.7639166666666667 -0.40275 -1.3402500000000002 -0.9514166666666667 -1.729166666666667 -1.6458333333333335 -0.3889166666666667 0.6944166666666667 -0.9305833333333334 1.2430833333333333 -1.625 1.6458333333333335 -0.6944166666666667 0.40275 -1.47225 0.6319166666666667 -2.3333333333333335 0.6875 -0.11108333333333334 1.7777500000000002 -0.22916666666666669 3.541666666666667 -0.3541666666666667 5.291666666666667 -0.125 1.7500000000000002 -0.3125 3.5000000000000004 -0.5625000000000001 5.25Zm12.583333333333334 0h5.583333333333334c-0.3889166666666667 -1.694416666666667 -0.6805833333333333 -3.4097500000000003 -0.8750000000000001 -5.145833333333333 -0.19441666666666668 -1.7360833333333334 -0.3194166666666667 -3.520833333333333 -0.375 -5.354166666666667 -0.6666666666666667 -0.13891666666666666 -1.2569166666666667 -0.3680833333333333 -1.7708333333333335 -0.6875s-1.0069166666666667 -0.7708333333333334 -1.4791666666666667 -1.3541666666666667c-0.27775 0.3889166666666667 -0.6110833333333333 0.7360833333333333 -1 1.0416666666666667s-0.75 0.52775 -1.0833333333333335 0.6666666666666667c0.08333333333333334 1.5833333333333333 0.20141666666666666 3.2569166666666667 0.3541666666666667 5.020833333333334 0.15275 1.7639166666666666 0.3680833333333333 3.701416666666667 0.6458333333333334 5.8125Zm5.25 -12.958333333333334c0.8889166666666667 0 1.6110833333333334 -0.3541666666666667 2.166666666666667 -1.0625 0.5555833333333333 -0.7083333333333334 0.8333333333333334 -1.53475 0.8333333333333334 -2.479166666666667h-6.041666666666667c0 0.9444166666666667 0.28475 1.7708333333333335 0.8541666666666666 2.479166666666667 0.5694166666666667 0.7083333333333334 1.2985833333333334 1.0625 2.1875 1.0625Z" stroke-width="0.8333"></path>
                </svg>
                <h3 class="text-white text-xl font-semibold">Festival perfecto</h3>
                <p class="text-gray-300">
                  Tu line-up ideal con los artistas que más escuchas. ¡Como si crearas tu propio festival!
                </p>
              </div>
  
              <div class="bg-gray-800 rounded-[10px] p-6 space-y-4">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="40"  height="40"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="text-green-400 icon icon-tabler icons-tabler-outline icon-tabler-vinyl"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 3.937a9 9 0 1 0 5 8.063" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M20 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M20 4l-3.5 10l-2.5 2" /></svg>
                <h3 class="text-white text-xl font-semibold">Reproductor personalizado</h3>
                <p class="text-gray-300">
                  Disfruta de un reproductor dinámico que adapta su contenido a tus hábitos de escucha.
                </p>
              </div>
  
              <div class="bg-gray-800 rounded-[10px] p-6 space-y-4">
              <!-- Icono de línea de tiempo / gráfico -->
              <svg  xmlns="http://www.w3.org/2000/svg"  width="40"  height="40"  viewBox="0 0 24 24"  fill="none" class="text-green-400 icon icon-tabler icons-tabler-outline icon-tabler-chart-bar-popular" stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 13a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M9 9a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M15 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M4 20h14" /></svg>
  
              <h3 class="text-white text-xl font-semibold">Evolución musical</h3>
              <p class="text-gray-300">
                Visualiza tus artistas, géneros y canciones favoritas por mes, temporada o año.
              </p>
            </div>
            </div>
          </div>
        </section>
      </div>

      <!-- How it works -->
      <section id="how-it-works" class="w-full py-12 md:py-24 lg:py-32">
        <div class="container px-4 md:px-6 mx-auto">
          <div class="flex flex-col items-center justify-center space-y-4 text-center max-w-[900px] mx-auto">
            <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">Cómo funciona</h2>
            <p class="text-gray-300 md:text-xl lg:text-base xl:text-xl leading-relaxed">
              En solo 3 pasos simples, tendrás acceso a todas tus estadísticas musicales personalizadas.
            </p>
          </div>
          <div class="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div class="flex flex-col items-center space-y-4 text-center">
              <div class="flex h-16 w-16 items-center justify-center rounded-full bg-[#9b22b6] font-bold text-xl">
                1
              </div>
              <h3 class="text-xl font-bold">Conecta tu cuenta</h3>
              <p class="text-gray-300">
                Autoriza de forma segura el acceso a tu cuenta de Spotify con un solo clic.
              </p>
            </div>
            <div class="flex flex-col items-center space-y-4 text-center">
              <div class="flex h-16 w-16 items-center justify-center rounded-full bg-[#9b22b6] font-bold text-xl">
                2
              </div>
              <h3 class="text-xl font-bold">Procesamos tus datos</h3>
              <p class="text-gray-300">
                Analizamos tu historial de reproducción y generamos estadísticas detalladas.
              </p>
            </div>
            <div class="flex flex-col items-center space-y-4 text-center">
              <div class="flex h-16 w-16 items-center justify-center rounded-full bg-[#9b22b6] font-bold text-xl">
                3
              </div>
              <h3 class="text-xl font-bold">Explora tus stats</h3>
              <p class="text-gray-300">
                Disfruta de visualizaciones interactivas y descubre insights sobre tu música.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { loginWithSpotify } from "../../auth";
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { spotyStore } from '../../SpotifyStore/spotyStore';
import FlipWords from '@/components/ui/flip-words/FlipWords.vue';
import LetterPullup from '@/components/ui/letter-pullup/LetterPullup.vue';
import TextHighlight from '@/components/ui/text-highlight/TextHighlight.vue';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import GlowBorder from "@/components/ui/glow-border/GlowBorder.vue";
import NumberTicker from "@/components/ui/number-ticker/NumberTicker.vue";

const router = useRouter();
const store = spotyStore();

const isVisible = ref(false);
const isDispositivosVisible = ref(false);

const letterPullupWrapper = ref(null);
const dispositivosWrapper = ref(null);

let observer1;
let observer2;

onMounted(async () => {
  if (window.location.hash.includes("access_token")) {
    await store.getAccessTokenFromUrl();
    router.replace("/overview");
  }

  observer1 = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer1.disconnect();
      }
    },
    { threshold: 0.1 }
  );
  if (letterPullupWrapper.value) observer1.observe(letterPullupWrapper.value);

  observer2 = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isDispositivosVisible.value = true;
        observer2.disconnect();
      }
    },
    { threshold: 0.1 }
  );
  if (dispositivosWrapper.value) observer2.observe(dispositivosWrapper.value);
});

onBeforeUnmount(() => {
  if (observer1) observer1.disconnect();
  if (observer2) observer2.disconnect();
});
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Onest:wght@100..900&display=swap');

.landing {
  font-family: "Onest", sans-serif;
  font-optical-sizing: auto;
}

html {
  scroll-behavior: smooth;
}
</style>
