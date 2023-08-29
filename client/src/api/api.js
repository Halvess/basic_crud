import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.2.178:3030/api',
    timeout: 1000
  });

export default api

