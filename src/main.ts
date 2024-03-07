import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/normalize.css'
import './assets/styles/global.sass'
import router from './router'

createApp(App).use(router).mount('#app')
