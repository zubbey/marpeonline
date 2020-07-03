import axios from 'axios';

export default {
    allCountries(){
        return axios.get('https://restcountries.eu/rest/v2/all')
    }
}