import Api from './Api';

export default {
    getUserCart(user){
        return Api.get(`cart/${user}`);
    },
    post(data){
        return Api.post('cart/', data);
    },
    updateCart(product, data){
        return Api.patch(`cart/${product}`, data); // remove this
    },
    updateProductQty(cartId, action){
        return Api.patch(`cart/${cartId}/?q=${action}`);
    },
    delete(product){
        return Api.delete(`cart/${product}`);
    },
    empty(user){
        return Api.delete(`cart/empty/${user}`);
    }
}