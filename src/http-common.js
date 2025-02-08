import axios from 'axios';

export default axios.create({
  baseURL: 'https://server-book-exchange.onrender.com',
  headers: {
    'Content-type': 'application/json',
  },
});
