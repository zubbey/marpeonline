import Product from '../Endpoints/product';
import Category from '../Endpoints/category';
import Cart from '../Endpoints/cart';
import Order from '../Endpoints/order';
import User from '../Endpoints/user';
import Admin from '../Endpoints/admin';
import Public_api from '../Endpoints/public_api';
import { reject } from 'lodash';

// GET ALL SETTINGS
export const getSettings = ({ commit }) => {
    commit('LOADING');
    Admin.systemSettings().then(response => {
        commit('SET_SETTINGS', response.data[0]);
        commit('RESET')
    })
}

// CHANGE CURRENCY
export const changeCurrency = ({ commit }, { newCurrency, currentCurrency }) => {
    commit('RESET');
    return new Promise((resolve, reject) => {
        Admin.changeCurrency(newCurrency, currentCurrency).then(({ data, status }) => {
            if (status === 200) {
                resolve(data, true)
            }
        })
            .catch(error => reject(error))
    })
}

// CONVERT CURRENCY
export const convertCurrency = ({ commit }, { payload }) => {
    commit('LOADING');
    return new Promise((resolve, reject) => {
        Public_api.convertCurrency(payload.from, payload.to).then(({ data, status }) => {
            if (status === 200) {
                resolve(data, true)
                commit('RESET');
            }
        })
            .catch(error => reject(error))
    })
}

// GET ALL PRODUCTS
export const getNigeriaProducts = ({ commit }) => {
    commit('LOADING');
    Product.allNigeria().then(response => {
        commit('SET_NIGERIA_PRODUCTS', response.data);
    })
}
export const get1688Products = ({ commit }) => {
    commit('LOADING');
    Product.all1688().then(response => {
        commit('SET_1688_PRODUCTS', response.data);
    })
}

// GET ALL SINGLE PRODUCT
export const getProduct = ({ commit }, productSlug) => {
    return new Promise((resolve, reject) => {
        commit('LOADING');
        Product.single(productSlug).then(response => {
            commit('SET_PRODUCT', response.data);
            resolve(true);
        })
            .catch(error => {
                reject(error)
            })
    });
}

// SEARCHED PRODUCT KEYWORD
export const getSearchedKeyword = ({ commit }, keyword) => {
    return new Promise((resolve, reject) => {
        commit('LOADING');
        Product.searchedKeyword(keyword).then(({ data, status }) => {
            if (status === 200) {
                resolve(data, true)
            }
        })
            .catch(error => reject(error))
    })
}

// GET ALL CATEGORIES
export const getCategories = ({ commit }) => {
    return new Promise((resolve, reject) => {
        commit('LOADING');
        Category.all().then(response => {
            resolve(response.data, true)
        })
            .catch(error => reject(error))
    })
}

// add product to cart
export const addToCart = ({ commit }, { product, qty, user, totalprice }) => {
    return new Promise((resolve, reject) => {
        Cart.post({
            product,
            qty,
            totalprice,
            user
        }).then(({ data, status }) => {
            if(status === 201){
                resolve(true)
                commit('ADD_TO_CART', data);
            }
        }).catch(error => reject(error))
    })
}

// increament Product Qty
export const updateProductQty = ({ commit }, payload) => {
    console.log(commit);
    console.log(payload);
    return new Promise((resolve, reject) => {
        Cart.updateProductQty(payload._id, payload.action).then(({ data, status }) => {
            if(status === 201) {
                resolve(data, true)
            }
        }).catch(error => reject(error))
    })
}

// Get product to cart 
export const getCartItems = ({ commit }, userid) => {
    commit('LOADING');
    return new Promise((resolve, reject) => {
        Cart.getUserCart(userid).then(({ data, status }) => {
            if (status === 200) {
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
export const emptyCart = ({ commit }, userid) => {
    console.log(commit);
    return new Promise((resolve, reject) => {
        Cart.empty(userid).then(({ status }) => {
            if (status === 200) {
                resolve(true);
            }
        })
            .catch(error => reject(error))
    })
}

// Verify Payment
export const verifyPayment = ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
        Order.verityTransaction(payload).then(({ data, status }) => {
            if (status === 200) {
                resolve(data, true)
            }
            if (data.data.status === 'success') {
                resolve('success', true);
                commit("TRANSACTION_SUCCESS");
            } else if (data.data.status === 'failed') {
                resolve('failed', true);
                commit("TRANSACTION_FAILED");
            } else if (data.data.gateway_response === 'Insufficient Funds') {
                resolve('insufficient', true);
                commit("TRANSACTION_INSUFFICIENT_FUNDS");
            } else if (data.message === 'Request was badly formed | Bad Request (400)') {
                resolve('failed', true);
                commit("RESET");
                console.log('failed');
            }
        })
            .catch(error => reject(error))
    })
}

//Place Order
export const initTransaction = ({ commit }, data) => {
    commit('LOADING');
    return new Promise((resolve, reject) => {
        Order.post(data).then(({ data, status }) => {
            if (status === 200) {
                resolve(data, true);
                commit('INIT_RESPONSE', data.message);
            }
        })
            .catch(error => reject(error))
    })
}

// PLACE DOMESTIC ORDER
export const placeDomesticOrder = ({ commit }, data) => {
    commit('LOADING');
    return new Promise((resolve, reject) => {
        Order.domesticOrder(data).then(({ data, status }) => {
            if (status === 200) {
                resolve(data, true);
            }
        })
            .catch(error => reject(error))
    })
}
// Authenticate and Authorize user
export const Authenticate_User = ({ commit }, accessToken) => {
    console.log(commit);
    return new Promise((resolve, reject) => {
        User.auth(accessToken).then(({ data, status }) => {
            if (status === 200) {
                resolve(data, true);
            }
        })
            .catch(error => reject(error))
    })
}

//Login User
export const loginUser = ({ commit }, user) => {
    return new Promise((resolve, reject) => {
        commit('AUTH_INIT');
        User.login(user).then(({ data, status }) => {
            if (status === 200) {
                resolve(data, true);
            }
        })
            .catch(error => reject(error))
    })
}

//get user orders
export const getOrders = ({ commit }, user) => {
    return new Promise((resolve, reject) => {
        commit('AUTH_INIT');
        User.orders(user).then(({ data, status }) => {
            if (status === 200) {
                resolve(data, true);
            }
        })
            .catch(error => reject(error))
    })
}

// add Purchase Order
export const addPurchaseOrder = ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
        commit('LOADING');
        User.addPurchaseOrder(payload).then(({ data, status }) => {
            if (status === 201) {
                resolve(data, true);
            }
        })
            .catch(error => reject(error))
    })
}

// get specific user purchase order
export const getPurchaseOrders = ({ commit }, user) => {
    return new Promise((resolve, reject) => {
        commit('AUTH_INIT');
        User.purchaseOrder(user).then(({ data, status }) => {
            if (status === 200) {
                resolve(data, true);
            }
        })
            .catch(error => reject(error))
    })
}

// delete specific user purchase
export const placePurchaseOrder = ({ commit }, { token, id, total }) => {
    console.log(total);
    return new Promise((resolve, reject) => {
        commit('AUTH_INIT');
        User.placepurchaseorder(token, id, { total }).then(({ status }) => {
            if (status === 200) {
                resolve(true);
            }
        })
            .catch(error => reject(error))
    })
}

// delete specific user purchase
export const deletePurchaseOrder = ({ commit }, { token, id }) => {
    return new Promise((resolve, reject) => {
        commit('AUTH_INIT');
        User.deletepurchase(token, id).then(({ status }) => {
            if (status === 200) {
                resolve(true);
            }
        })
            .catch(error => reject(error))
    })
}

//  ################# ONLY PURCHASE #################
// add ONLY Purchase 
export const addOnlyPurchase = ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
        commit('LOADING');
        User.addOnlyPurchase(payload.token, payload.data).then(({ data, status }) => {
            if (status === 201) {
                resolve(data, true);
            }
        })
            .catch(error => reject(error))
    })
}

// get specific user Only purchase
export const getOnlyPurchase = ({ commit }, accessToken) => {
    return new Promise((resolve, reject) => {
        commit('AUTH_INIT');
        User.onlyPurchase(accessToken).then(({ data, status }) => {
            if (status === 200) {
                resolve(data, true);
            }
        })
            .catch(error => reject(error))
    })
}

// user Only purchase payment
export const placeOnlyPurchase = ({ commit }, { token, id, total }) => {
    return new Promise((resolve, reject) => {
        commit('AUTH_INIT');
        User.placeOnlypurchaseOrder(token, id, { total }).then(({ status }) => {
            if (status === 200) {
                resolve(true);
            }
        })
            .catch(error => reject(error))
    })
}
// delete specific user Only purchase
export const deleteOnlyPurchase = ({ commit }, { token, id }) => {
    return new Promise((resolve, reject) => {
        commit('AUTH_INIT');
        User.deleteOnlyPurchase(token, id).then(({ status }) => {
            if (status === 200) {
                resolve(true);
            }
        })
            .catch(error => reject(error))
    })
}

// Register User
export const registerUser = ({ commit }, user) => {
    return new Promise((resolve, reject) => {
        commit('AUTH_INIT');
        User.register(user).then(({ data, status }) => {
            if (status === 201) {
                resolve(data, true);
            }
        }).catch(error => reject(error))
    })
}

//Log out
export const logoutUser = ({ commit }) => {
    return new Promise((resolve) => {
        commit('LOGOUT');
        localStorage.removeItem('accessToken');
        resolve(true);
    })
}


// GET COUNTRIES
export const getCountries = () => {
    return new Promise((resolve, reject) => {
        Public_api.allCountries().then(({ status, data }) => {
            if (status == 200) {
                resolve(data, true)
            }
        })
            .catch(error => reject(error))
    })
}

// Update user full info
export const updateUserInfo = ({ commit }, { token, payload }) => {
    commit('AUTH_INIT');
    return new Promise((resolve, reject) => {
        User.updateUserInfo(token, payload).then(({ status }) => {
            if (status == 200)
                resolve(true);
        })
            .catch(error => reject(error))
    })
}

// Update user addresss
export const updateAddress = ({ commit }, { token, payload }) => {
    commit('AUTH_INIT');
    return new Promise((resolve, reject) => {
        User.updateAddress(token, payload).then(({ status }) => {
            if (status == 200)
                resolve(true);
        })
            .catch(error => reject(error))
    })
}

// Update user password
export const updatePassword = ({ commit }, { token, password, oldpassword }) => {
    commit('AUTH_INIT');
    return new Promise((resolve, reject) => {
        User.updatePassword(token, { password, oldpassword }).then(({ status }) => {
            if (status == 200)
                resolve(true);
        })
            .catch(error => reject(error))
    })
}

// get and check Affilate
export const getAffiliate = ({ commit }, referralCode) => {
    commit('CHECK_REFERRAL_CODE');
    return new Promise((resolve, reject) => {
        User.getAffiliate(referralCode).then(({ status, data }) => {
            if (status == 200)
                resolve(data, true)
        })
            .catch(error => reject(error))
    });
}

// update user Affiliates
export const updateAffiliate = ({ commit }, { referralid, email }) => {
    commit('CHECK_REFERRAL_CODE');
    return new Promise((resolve, reject) => {
        User.updateAffiliate(referralid, {
            affiliate_email: email,
            point: 10,
            date: new Date().toLocaleDateString()
        })
            .then(({ status }) => {
                if (status == 200)
                    resolve(true)
            })
            .catch(error => reject(error))
    })
}


export const Authenticate_Admin = ({ commit }, accessToken) => {
    console.log(commit);
    return new Promise((resolve, reject) => {
        Admin.auth(accessToken).then(({ data, status }) => {
            if (status === 200) {
                resolve(data, true);
            }
        })
            .catch(error => reject(error))
    })
}

// Create New Admin
export const registerAdmin = ({ commit }, admin) => {
    return new Promise((resolve, reject) => {
        commit('AUTH_INIT');
        Admin.register(admin).then(({ data, status }) => {
            if (status === 201) {
                resolve(data, true);
            }
        }).catch(error => reject(error))
    })
}

//Login Admin
export const loginAdmin = ({ commit }, admin) => {
    return new Promise((resolve, reject) => {
        commit('AUTH_INIT');
        Admin.login(admin).then(({ data, status }) => {
            if (status === 200) {
                resolve(data, true);
            }
        })
            .catch(error => reject(error))
    })
}

// Get All Users (Admin privilege)
export const getAllData = ({ commit }, { accessToken }) => {
    commit('RESET');
    return new Promise((resolve, reject) => {
        Admin.getAllData(accessToken).then(({ status, data }) => {
            if (status === 200) {
                resolve(data, true);
            }
        }).catch(error => reject(error))
    })
}
//admin create new Category
export const createCategory = ({commit}, payload ) => {
    commit('LOADING');
    return new Promise((resolve, reject) => {
        Admin.addCategory(payload.token, payload).then(({ status, data }) => {
            if (status === 201) {
                resolve(data, true);
                commit('RESET');
            }
        }).catch(error => reject(error))
    })
}

//admin create new Category
export const deleteCategory = ({commit}, payload ) => {
    commit('LOADING');
    return new Promise((resolve, reject) => {
        Admin.deleteCategory(payload.token, payload.id).then(({ status, data }) => {
            if (status === 200) {
                resolve(data, true);
                commit('RESET');
            }
        }).catch(error => reject(error))
    })
}
// Admin Add new Product
export const addProduct = ({ commit }, { token, payload }) => {
    commit('LOADING');
    return new Promise((resolve, reject) => {
        Admin.addProduct(token, payload).then(({ status, data }) => {
            if (status === 201) {
                resolve(data, true);
            }
        }).catch(error => reject(error))
    })
}

// Admin Update Product
export const updateProduct = ({ commit }, { token, payload }) => {
    commit('LOADING');
    return new Promise((resolve, reject) => {
        Admin.updateProduct(token, payload, payload._id).then(({ status, data }) => {
            if (status === 201) {
                resolve(data, true);
            }
        }).catch(error => reject(error))
    })
}

// Admin delete a product
export const deleteProduct = ({ commit }, { token, item }) => {
    commit('LOADING');
    return new Promise((resolve, reject) => {
        Admin.deleteProduct(token, item._id).then(({ status, data }) => {
            if (status === 200) {
                resolve(data, true);
            }
        }).catch(error => reject(error))
    })
}

// Update Shipment (Admin Privilege)
export const updateShipment = ({ commit }, { accessToken, orderId }) => {
    commit('LOADING');
    return new Promise((resolve, reject) => {
        Admin.updateDomesticOrder(accessToken, orderId).then(({ status, data }) => {
            if (status === 200) {
                resolve(data, true);
            }
        })
            .catch(error => reject(error))
    })
}

// update settings (Admin Privilege)
export const updateGeneralSettings1 = ({ commit }, payload ) => {
    commit('LOADING');
    return new Promise((resolve, reject) => {
        Admin.updateGeneralSettings1(payload.token, payload).then(({ status, data }) => {
            if (status === 200) {
                resolve(data, true);
            }
        })
            .catch(error => reject(error))
    })
}

export const updateGeneralSettings2 = ({ commit }, payload ) => {
    commit('LOADING');
    return new Promise((resolve, reject) => {
        Admin.updateGeneralSettings2(payload.token, payload).then(({ status, data }) => {
            if (status === 200) {
                resolve(data, true);
            }
        })
            .catch(error => reject(error))
    })
}