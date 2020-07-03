import Api from './Api';

export default {
    getAllOrder(token){
        return Api.get('order/', { headers: { 'Authorization': `Bearer ${token}`} })
    },
    post(data){
        return Api.post('order/', data);
    }
}