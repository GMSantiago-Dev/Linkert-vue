// src/axios.js

//libreria de axios, es la estructura necesaria para hacer la peticion, se instancia/importa en signIn.vue
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://a.chessecuban.us/api/',
});

export default instance;

const token = sessionStorage.getItem('token');