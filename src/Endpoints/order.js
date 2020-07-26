import Api from './Api';

export default {
    getAllOrder(token){
        return Api.get('order/', { headers: { 'Authorization': `Bearer ${token}`} })
    },
    domesticOrder(data){
        return Api.post('order/domestic', data);
    },
    post(data){
        return Api.post('initializetransaction/', data);
    },
    verityTransaction(reference){
        return Api.post('verifypayment/', reference);
    }
    // post(data){
    //     return Api.post('testpayment/', data);
    // }
}