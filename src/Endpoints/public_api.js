import axios from 'axios';

export default {
    allCountries(){
        return axios.get('https://restcountries.eu/rest/v2/all')
    },
    convertCurrency(from, to){
        return axios.get(`https://free.currconv.com/api/v7/convert?q=${from}_${to}&compact=ultra&apiKey=e2f85c6a07bf0bafb9ee`)
        // return axios.get(`https://currency.labstack.com/api/v1/convert/1/${from}/${to}`, { headers: { 'Authorization': `Bearer -5L2fNtDDvDI3VbFvd8hJxONHDQoXTLs2KQAV7gf-NWY52mDfYw6I`} })
    }
}