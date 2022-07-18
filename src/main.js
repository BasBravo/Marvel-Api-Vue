import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";

const app = createApp(App)

import Panda from './utils/panda';
app.use(Panda);

app.use(router);

app.mount('#app');