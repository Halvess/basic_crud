import axios from 'axios'


const api = axios.create({
    baseURL: `https://halvess.dev/basic_crud/api`,
    timeout: 5000
  });

export default api

