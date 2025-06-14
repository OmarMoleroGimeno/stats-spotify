import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from "./router/index.js";
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ScrollTop from 'primevue/scrolltop';
import 'primeicons/primeicons.css';

const app = createApp(App);
const pinia = createPinia()
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});;
app.use(pinia);
app.use(router);
app.use(PrimeVue);
app.component('ScrollTop', ScrollTop);
app.mount('#app');
