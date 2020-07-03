import Api from './Api';

export default {
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
}