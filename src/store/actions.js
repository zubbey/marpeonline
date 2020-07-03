import Product from '../Endpoints/product';
import Category from '../Endpoints/category';
import Cart from '../Endpoints/cart';
import Order from '../Endpoints/order';
import User from '../Endpoints/user';
import Admin from '../Endpoints/admin';
import Public_api from '../Endpoints/public_api';

// GET ALL PRODUCTS
export const getNigeriaProducts = ({ commit }) =>{
    Product.allNigeria().then(response => {
        commit('SET_NIGERIA_PRODUCTS', response.data);
    })
}
export const get1688Products = ({ commit }) =>{
    Product.all1688().then(response => {
        commit('SET_1688_PRODUCTS', response.data);
    })
}

// GET ALL SINGLE PRODUCT
export const getProduct = ({ commit }, productSlug) =>{
    return new Promise (async (resolve, reject) => {
        commit('LOADING');
        await Product.single(productSlug).then(response => {
            commit('SET_PRODUCT', response.data);
            resolve(true);
        })
        .catch(error => {
            reject(error)
        })
    });
}

// GET ALL CATEGORIES
export const getCategories = ({ commit }) =>{
    Category.all().then(response => {
        commit('SET_CATEGORIES', response.data);
    })
}

// add product to cart
export const addToCart = ({ commit }, {product, qty, user}) => {
    commit('ADD_TO_CART', {product, qty});
    Cart.getUserCart(user._id).then(({ data }) => {
        if(data.length > 0){
            data.forEach(cart => {
                if(cart.product._id === product._id){
                // update cart
                    Cart.updateCart(product._id, {
                        product,
                        qty,
                        user
                    })
                    .then(({status}) => {
                        if(status === 201) {
                            Promise.resolve(true);
                        }
                    })
                    .catch(error => Promise.reject(error))
                } else {
                    Cart.post({
                        product: product,
                        qty: qty,
                        user: user
                    })
                }
            })
        } else {
            Cart.post({
                product: product,
                qty: qty,
                user: user
            })
        }
        
    })
    .catch(error => Promise.reject(error))
}

// Get product to cart 
export const getCartItems = ({commit}, userid) => {
    return new Promise((resolve, reject) => {
        Cart.getUserCart(userid).then(({status, data}) => {
            if(status == 200){
                resolve(data, true)
            }
        })
        .catch(error => reject(error))
    })
}

// Remove item from cart
export const removeCartItem = ({ commit }, product) => {
    commit('REMOVE_CART_ITEM', product);
    Cart.delete(product._id);
}

// Empty User Cart
export const emptyCart = ({commit}, userid) => {
    return new Promise( async (resolve, reject) => {
        await Cart.empty(userid).then(({status}) => {
            if(status === 200){
                resolve(true);
            }
        })
        .catch(error => reject(error))
    })
}

//Place Order
export const placeOrder = ({ commit }, data ) => {
    commit('LOADING');
    return new Promise( async (resolve, reject) => {
        await Order.post(data).then(response => {
            resolve(response)
        })
        .catch(error => reject(error))
    })
}

// Authenticate and Authorize user
export const Authenticate_User = ({ commit }, accessToken) => {
    return new Promise( async (resolve, reject) => {
        await User.auth(accessToken).then(({data, status}) => {
            if(status === 200){
                resolve(data, true);
            }
        })
        .catch(error => reject(error))
    }) 
}

//Login User
export const loginUser = ({ commit }, user) => {
    return new Promise( async (resolve, reject) => {
        commit('AUTH_INIT');
       await User.login(user).then(({data, status}) => {
            if(status === 200){
                resolve(data, true);
            }
        })
        .catch(error => reject(error))
    })
}

//get user orders
export const getOrders = ({ commit }, user) => {
    return new Promise( async (resolve, reject) => {
        commit('AUTH_INIT');
       await User.orders(user).then(({data, status}) => {
            if(status === 200){
                resolve(data, true);
            }
        })
        .catch(error => reject(error))
    })
}

// Register User
export const registerUser = ({ commit }, user) => {
    return new Promise( async (resolve, reject) => {
        commit('AUTH_INIT');
        await User.register(user).then(({data, status }) => {
            if(status === 201){
                resolve(data, true);
            }
        }).catch(error => reject(error))
    })
}

//Log out
export const logoutUser = ({ commit }) => {
    return new Promise( async (resolve) => {
        commit('LOGOUT');
        localStorage.removeItem('accessToken');
        resolve(true);
    })
}


// GET COUNTRIES
export const getCountries = ({ commit }) => {
    return new Promise(async (resolve, reject) => {
        await Public_api.allCountries().then(({status, data}) => {
            if(status == 200){
                resolve(data, true)
            }
        })
        .catch(error => reject(error))
    })
}

// Update user full info
export const updateUserInfo = ({ commit }, {token, payload}) => {
    commit('AUTH_INIT');
    return new Promise(async (resolve, reject) => {
        await User.updateUserInfo(token, payload).then(({ status }) => {
            if(status == 200)
                resolve(true);
        })
        .catch(error => reject(error))
    })
}

// Update user addresss
export const updateAddress = ({ commit }, {token, payload}) => {
    commit('AUTH_INIT');
    return new Promise(async (resolve, reject) => {
        await User.updateAddress(token, payload).then(({ status }) => {
            if(status == 200)
                resolve(true);
        })
        .catch(error => reject(error))
    })
}

// Update user password
export const updatePassword = ({ commit }, {token, password, oldpassword}) => {
    commit('AUTH_INIT');
    return new Promise(async (resolve, reject) => {
        await User.updatePassword(token, {password, oldpassword}).then(({ status }) => {
            if(status == 200)
                resolve(true);
        })
        .catch(error => reject(error))
    })
}

// get and check Affilate
export const getAffiliate = ({ commit }, referralCode) => {
    commit('CHECK_REFERRAL_CODE');
    return new Promise(async (resolve, reject) => {
        await User.getAffiliate(referralCode).then(({ status, data}) =>{
            if(status == 200)
                resolve(data, true)
        })
        .catch(error => reject(error))
    });
}

// update user Affiliates
export const updateAffiliate = ({ commit }, {referralid, email}) => {
    commit('CHECK_REFERRAL_CODE');
    return new Promise(async (resolve, reject) => {
        await User.updateAffiliate(referralid, {
            affiliate_email: email,
            point: 10,
            date: new Date().toLocaleDateString()
          })
        .then(({ status }) => {
            if(status == 200)
                resolve(true)
        })
        .catch(error => reject(error))
    })
}


export const Authenticate_Admin = ({ commit }, accessToken) => {

    return new Promise( async (resolve, reject) => {
        await Admin.auth(accessToken).then(({data, status}) => {
            if(status === 200){
                resolve(data, true);
            }
        })
        .catch(error => reject(error))
    }) 
}

// Create New Admin
export const registerAdmin = ({ commit }, admin) => {
    return new Promise( async (resolve, reject) => {
        commit('AUTH_INIT');
        await Admin.register(admin).then(({data, status }) => {
            if(status === 201){
                resolve(data, true);
            }
        }).catch(error => reject(error))
    })
}

//Login Admin
export const loginAdmin = ({ commit }, admin) => {
    return new Promise( async (resolve, reject) => {
        commit('AUTH_INIT');
       await Admin.login(admin).then(({data, status}) => {
            if(status === 200){
                resolve(data, true);
            }
        })
        .catch(error => reject(error))
    })
}

// Get All Users (Admin privilege)
export const getAllData = ({ commit }, { accessToken }) => {
    return new Promise( async (resolve, reject) => {
        await Admin.getAllData(accessToken).then(({status, data}) => {
            if(status === 200){
                resolve(data, true);
            }
        })
        .catch(error => reject(error))
    })
}