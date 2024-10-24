import axios from 'axios';

const api = axios.create({
  baseURL: 'http://stingray-app-qgrep.ondigitalocean.app/',
  timeout: 30000,
});

export default api;
