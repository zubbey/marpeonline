import axios from 'axios';

const Api = axios.create({
    baseURL: 'https://cryptic-dusk-48323.herokuapp.com/api'
});

export default Api;