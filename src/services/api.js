import axios from 'axios';

const api = axios.create({
  //  baseURL: 'https://apidelivery.ltai.com.br',
  // baseURL: 'https://api.glindoor.com.br',
  // baseURL: 'http://192.168.1.4:3333/',
  // baseURL: 'http://10.0.2.2:3333/',
  baseURL: 'http://192.168.1.13:3333',
  // baseURL: 'http://10.0.12.114:3333/',
});

// api.defaults.headers.authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjMsImlhdCI6MTU5Mjg1MzAxNX0._lLwyuuxnHwSzavj5n8DD8SRMfNDBx_q01dOo7rRB74`

export default api;
