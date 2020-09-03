// re-render vue dom
export const RE_RENDER = (state) => {
    state.re_render = true;
}

export const RENDER_RESET = (state) => {
    if(state.re_render)
        state.re_render = false;
}

export const LOADING = (state) => {
    state.log.loading = true;
}

export const RESOLVED = (state) => {
    state.log.loading = false;
}
export const RESET_TOAST = (state) => {
    state.toast.status = '';
    state.toast.message = '';
}
// Set System settings
export const SET_SETTINGS = (state, settings) => {
    state.settings = settings;
    state.currencyType = settings.currencyType.find(currency => currency.default === true);
}
export const CHANGE_CURRENCY = (state, newCurrency) => {
    state.currencyType = newCurrency[0]
}

export const UPDATE_D_TO_N = (state, value) => {
    state.d_to_n = value
}
// Set Nigeria products
export const SET_NIGERIA_PRODUCTS = (state, products) => {
    state.productsInNigeria = products;
    state.log.loading = false;
}
// set 1688 products
export const SET_1688_PRODUCTS = (state, products) => {
    state.productsIn1688 = products;
    state.log.loading = false;
}
// Set a single products
export const SET_PRODUCT = (state, product) => {
    state.product = product;
}

// Set searched product keyword
export const SET_SEARCHED_RESULT = (state, products) => {
    state.searchedResult = products;
}

// Set all categories
export const SET_CATEGORIES = (state, categories) => {
    state.categories = categories;
}
// Set add to cart
export const ADD_TO_CART = (state, data) => {
    state.toast.status = 'success';
    state.toast.message = 'item is added to cart!';
    let productInCart = state.cart.find(item => {
        return item.product._id === data.product._id;
    });
    if(productInCart){
        productInCart.qty += data.qty;
        return;
    }
    state.cart.push(data);
}
// increase item qty
export const INC = (state, productId) => {
    let cartItem = state.cart.filter(item => item.product._id === productId);
    cartItem[0].qty ++;
    state.toast.status = 'success';
    state.toast.message = 'item quantity has been increased!';
}

// decrease item qty
export const DEC = (state, productId) => {
    let cartItem = state.cart.filter(item => item.product._id === productId);
    cartItem[0].qty --;
    state.toast.status = 'success';
    state.toast.message = 'item quantity has been decreased!';
}

// Set cart product from cart
export const SET_CART = (state, cartItems) => {
    state.cart = cartItems;
}

// Init transaction
export const INIT_RESPONSE = (state, msg) => {
    state.transaction = 'warning';
    state.log.message = msg;
}
// transaction status
export const TRANSACTION_SUCCESS = (state) => {
    state.transaction = 'success';
}
// Transaction Failed
export const TRANSACTION_FAILED = (state) => {
    state.transaction = 'failed';
}
// Transaction Failed
export const TRANSACTION_INSUFFICIENT_FUNDS = (state) => {
    state.transaction = 'Insufficient Funds';
}

// Set user orders from cart
export const SET_ORDERS = (state, orders) => {
    state.orders = orders;
}

// Set purchase order from cart
export const SET_PURCHASE_ORDER = (state, purchaseorder) => {
    return state.purchaseorder.push({data: purchaseorder});
    
}
// delte purchase order
export const DELETE_PURCHASE_ORDER = (state, product) => {
    state.toast.status = 'deleted';
    state.toast.message = 'Purchase item is Deleted';
    state.purchaseorder = state.purchaseorder.filter(item => {
        return item._id != product._id;
    });
}

// ONLY PURCHASE

export const SET_NEW_ONLY_PURCHASE = (state, onlypurchase) => {
    return state.onlypurchase.push(onlypurchase);
}
export const SET_ONLY_PURCHASE = (state, onlypurchase) => {
    return state.onlypurchase = onlypurchase;
}
// delte purchase order
export const DELETE_ONLY_PURCHASE_ORDER = (state, product) => {
    state.toast.status = 'deleted';
    state.toast.message = 'Purchase item is removed';
    state.onlypurchase = state.onlypurchase.filter(item => {
        return item._id != product._id;
    });
}


// remove product from cart
export const REMOVE_CART_ITEM = (state, product) => {
    state.toast.status = 'deleted';
    state.toast.message = 'Item is removed';
    state.cart = state.cart.filter(item => {
        return item.product._id != product._id;
    });
}
// empty cart
export const EMPTY_CART = (state) => {
    state.toast.status = 'deleted';
    state.toast.message = 'Cart is empty';
    state.cart = [];
}

// validate cpassword log
export const AUTH_INIT = (state) => {
    state.log.loading = true;
}

export const logWrongPassword = (state, msg) => {
    state.toast.status = 'danger';
    state.toast.message = msg;
    state.log.msgError = true; 
}

export const logServerErr = (state, errorMsg) => {
    state.toast.status = 'danger';
    state.toast.message = errorMsg;
    state.log.loading = false;
    state.log.msgError = true;
}
export const FORBIDDEN = (state) => {
    state.log.msgError = true;
    state.toast.status = 'success';
    state.toast.message = 'Sorry you\'re restricted';
}

export const RESET = (state) => {
    state.log.loading = false;
    state.log.msgError = false;
    state.log.msgSuccess = false;
    state.log.message = '';
}

export const SUCCESS = (state, payload) => {
    // reset msg
    state.log.loading = false;
    state.log.msgError = false;
    state.log.msgSuccess = true;
    state.log.message = '';

    if(payload.user){
        state.user = payload.user;
        state.log.isUserActive = true;
        if(!localStorage.getItem('isAuthorized'))
            state.toast.status = 'success';
            state.toast.message = payload.message;
    }
}
// ADMIN CREATED USERS
export const USER_CREATED = (state) => {
    state.log.loading = false;
    state.log.msgError = false;
    state.toast.status = 'success';
    state.toast.message = 'New user added successfully!';
}

// ADMIN SUCCESS LOGIN
export const SUCCESS_ADMIN = (state, payload) => {
    // reset msg
    state.log.loading = false;
    state.log.msgError = false;
    state.log.msgSuccess = true;
    state.log.message = '';

    state.user = payload;
    state.log.isUserActive = true;
    state.log.isAdmin = true;
    state.toast.status = 'success';
    state.toast.message = 'Access Granted Successfully!';

}

export const SAVED = (state, msg) =>{
    state.log.loading = false;
    state.log.msgError = false;
    state.log.msgSuccess = true;
    state.toast.status = 'success';
    state.toast.message = msg;
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
export const SET_ADMIN_DATA = (state, data) => {
    state.adminData = data;
}

export const UPDATE_SHIPMENT_ORDER = (state, data) => {
    state.adminData.orders = data;
    state.toast.status = 'success';
    state.toast.message = 'shipment updated successfully!';
}
// add new category
export const NEW_CATEGORY_CREATED = (state, category) => {
    state.adminData.category.unshift(category);
    state.toast.status = 'success';
    state.toast.message = 'new category added!';
}
// delete category
export const CATEGORY_DELETED = (state, id) => {
    state.adminData.category = state.adminData.category.filter(cat => cat._id != id);
    state.toast.status = 'success';
    state.toast.message = 'category deleted!';
}
// add new product
export const ADD_NEW_PRODUCT = (state, product) => {
    state.adminData.products.unshift(product)
}
// update products
export const UPDATE_PRODUCTS = (state, payload) => {
    if(payload.products)
        state.adminData.products = payload.products
}