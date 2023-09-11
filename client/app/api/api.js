import axios from 'axios'


const api = axios.create({
    baseURL: `http://${window.location.hostname}:3030/api`,
    timeout: 1000
  });

export default api

