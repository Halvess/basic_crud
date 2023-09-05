import axios from 'axios'


const api = axios.create({
    baseURL: `http://${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/api`,
    timeout: 1000
  });

export default api

