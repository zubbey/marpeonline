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
    },
    addCategory(token, data){
        return Api.post('category/', data, { headers: { 'Authorization': `Bearer ${token}`} });
    },
    deleteCategory(token, id){
        return Api.delete(`category/${id}`, { headers: { 'Authorization': `Bearer ${token}`} });
    },
    addProduct(token, data){
        return Api.post('products/', data, { headers: { 'Authorization': `Bearer ${token}`} });
    },
    updateProduct(token, data, id){
        return Api.patch(`products/${id}`, data, { headers: { 'Authorization': `Bearer ${token}`} });
    },
    deleteProduct(token, id){
        return Api.delete(`products/${id}`, { headers: { 'Authorization': `Bearer ${token}`} });
    },
    updateGeneralSettings1(token, data){
        return Api.patch('settings/general1', data, { headers: { 'Authorization': `Bearer ${token}`} });
    },
    updateGeneralSettings2(token, data){
        return Api.patch('settings/general2', data, { headers: { 'Authorization': `Bearer ${token}`} });
    }
}