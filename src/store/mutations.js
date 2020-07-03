export const LOADING = (state) => {
    state.log.loading = true;
}

export const RESOLVED = (state) => {
    state.log.loading = false;
}
// Set Nigeria products
export const SET_NIGERIA_PRODUCTS = (state, products) => {
    state.productsInNigeria = products;
}
// set 1688 products
export const SET_1688_PRODUCTS = (state, products) => {
    state.productsIn1688 = products;
}
// Set a single products
export const SET_PRODUCT = (state, product) => {
    state.product = product;
}
// Set all categories
export const SET_CATEGORIES = (state, categories) => {
    state.categories = categories;
}
// Set add to cart
export const ADD_TO_CART = (state, {product, qty}) => {
    let productInCart = state.cart.find(item => {
        return item.product._id === product._id;
    });
    if(productInCart){
        productInCart.qty += qty;
        return;
    }
    state.cart.push({product, qty});
}

// Set cart product from cart
export const SET_CART = (state, cartItems) => {
    state.cart = cartItems;
}
// Set user orders from cart
export const SET_ORDERS = (state, orders) => {
    state.orders = orders;
}
// set remove product from cart
export const REMOVE_CART_ITEM = (state, product) => {
    state.cart = state.cart.filter(item => {
        return item.product._id != product._id;
    });
}
// empty cart
export const EMPTY_CART = (state) => {
    state.cart = [];
}

// validate cpassword log
export const AUTH_INIT = (state) => {
    state.log.loading = true;
}

export const logWrongPassword = (state, msg) => {
    state.log.msgError = true;
    state.log.message = msg;
}

export const logServerErr = (state, errorMsg) => {
    state.log.loading = false;
    state.log.msgError = true;
    state.log.message = errorMsg;
}

export const RESET = (state) => {
    state.log.loading = false;
    state.log.msgError = false;
    state.log.msgSuccess = false;
    state.log.message = '';
}

export const SUCCESS = (state, success) => {
    // reset msg
    state.log.loading = false;
    state.log.msgError = false;
    state.log.msgSuccess = true;
    state.log.message = '';

    if(success.user){
        state.user = success.user;
        state.log.message = success.message;
        state.log.isUserActive = true;
    }
}

export const SAVED = (state, msg) =>{
    state.log.loading = false;
    state.log.msgError = false;
    state.log.msgSuccess = true;
    state.log.message = msg;
}

// reset logged in user
export const LOGOUT = (state) => {
    state.log.isUserActive = false;
}

// set loading affiliate
export const CHECK_REFERRAL_CODE = (state) => {
    state.log.loading = true;
}

// set all user admin privilege 
export const SET_DATA = (state, data) => {
    state.users = data.users;
    state.products = data.products;
    state.categories = data.category;
}