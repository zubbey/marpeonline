import Api from './Api';

export default {
    allNigeria(){
        return Api('products/Products Available in Our Nigerian Warehouse')
    },
    all1688(){
        return Api('products/Products On Preorders')
    },
    single(slug){
        return Api(`product/${slug}`)
    },
    searchedKeyword(keyword, category){
        return Api(`products?q=${keyword}&category=${category}`)
    }
}