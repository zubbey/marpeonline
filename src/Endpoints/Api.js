import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://ec2-34-202-157-59.compute-1.amazonaws.com:5000/api'
    // baseURL: 'http://localhost:5000/api'
});

export default Api;