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