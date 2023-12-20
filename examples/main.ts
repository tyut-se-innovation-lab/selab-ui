import { createApp } from 'vue';
import App from './app.vue';
import selab from 'selab-ui';
const app = createApp(App);
app.use(selab);
app.mount('#app');
