import axios from 'axios';

const Api = axios.create({
    // baseURL: 'https://cryptic-dusk-48323.herokuapp.com/api'
    baseURL: 'http://localhost:5000/api'
});

export default Api;