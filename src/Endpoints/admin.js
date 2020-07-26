import Api from './Api';

export default {
    systemSettings(){
        return Api.get('settings')
    },
    changeCurrency(newCurrency, currentCurrency){
        return Api.patch(`settings/currency?new=${newCurrency}&current=${currentCurrency}`)
    },
    register(data){
        return Api.post('admin/register/', data)
    },
    login(data){
        return Api.post('admin/login/', data)
    },
    auth(token){
        return Api.get('admin/', { headers: { 'Authorization': `Bearer ${token}`} })
    },
    getAllData(token){
        return Api.get('admin/data/', { headers: { 'Authorization': `Bearer ${token}`} })
    },
    updateDomesticOrder(token, orderId){
        return Api.patch(`admin/order/${orderId}`, { headers: { 'Authorization': `Bearer ${token}`} });
    }
}