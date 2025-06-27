import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from "./router/index.js";
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ScrollTop from 'primevue/scrolltop';
import 'primeicons/primeicons.css';
import AnimateOnScroll from 'primevue/animateonscroll';
import 'animate.css';

const app = createApp(App);
const pinia = createPinia();
app.directive('animateonscroll', AnimateOnScroll);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            cssLayer: false,
        }
    }
});
app.use(pinia);
app.use(router);
app.component('ScrollTop', ScrollTop);
app.mount('#app');
