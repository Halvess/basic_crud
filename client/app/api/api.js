import axios from 'axios'


const api = axios.create({
    baseURL: `http://${window.location.hostname}/api`,
    timeout: 5000
  });

export default api

