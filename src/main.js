import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';
axios.defaults.baseURL = 'https://a.chessecuban.us/api/'; // convierte el axios baseURL al puerto seleccionado

createApp(App).mount('#app')
