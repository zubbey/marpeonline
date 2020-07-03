import Api from './Api';

export default {
    allNigeria(){
        return Api('products/Products Available in Our Nigerian Warehouse')
    },
    all1688(){
        return Api('products/Featured Products from 1688')
    },
    single(slug){
        return Api(`product/${slug}`)
    }
}