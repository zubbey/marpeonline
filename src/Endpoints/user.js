import Api from './Api';

export default {
    register(data){
        return Api.post('users/register/', data)
    },

    login(data){
        return Api.post('users/login/', data)
    },

    auth(token){
        return Api.get('/users', { headers: { 'Authorization': `Bearer ${token}`} })
    },

    orders(token){
        return Api.get('user/orders/', { headers: { 'Authorization': `Bearer ${token}`} })
    },

    addPurchaseOrder(data){
        return Api.post('users/purchaseorder/', data)
    },

    purchaseOrder(token){
        return Api.get('user/purchaseorder/', { headers: { 'Authorization': `Bearer ${token}`} })
    },

    placepurchaseorder(token, id, data){
        return Api.patch(`user/purchaseorder/${id}`, data, { headers: { 'Authorization': `Bearer ${token}`} })
    },

    deletepurchase(token, id){
        return Api.delete(`user/purchaseorder/${id}`, { headers: { 'Authorization': `Bearer ${token}`} })
    },

    // ONLY PURCHASE

    addOnlyPurchase(token, data){
        return Api.post('users/onlypurchase/', data, { headers: { 'Authorization': `Bearer ${token}`} } )
    },

    onlyPurchase(token){
        return Api.get('user/onlypurchase/', { headers: { 'Authorization': `Bearer ${token}`} })
    },

    onlyPayment(token){
        return Api.get('user/onlypayment/', { headers: { 'Authorization': `Bearer ${token}`} })
    },

    placeOnlypurchaseOrder(token, id, data){
        return Api.patch(`user/onlypurchase/${id}`, data, { headers: { 'Authorization': `Bearer ${token}`} })
    },

    deleteOnlyPurchase(token, id){
        return Api.delete(`user/onlypurchase/${id}`, { headers: { 'Authorization': `Bearer ${token}`} })
    },

    // UPDATE USER

    updateUserInfo(token, data){
        return Api.patch('user/info/', data, { headers: { 'Authorization': `Bearer ${token}`} })
    },

    updateAddress(token, data){
        return Api.patch('user/address/', data, { headers: { 'Authorization': `Bearer ${token}`} })
    },

    updatePassword(token, data){
        return Api.patch('user/password/', data, { headers: { 'Authorization': `Bearer ${token}`} })
    },

    getAffiliate(data){
        return Api.get(`users/affiliate/${data}`)
    },

    updateAffiliate(id, data){
        return Api.patch(`users/affiliate/${id}`, data)
    }
}