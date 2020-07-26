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
export const ADD_TO_CART = (state, {product, qty}) => {
    state.toast.status = 'success';
    state.toast.message = 'item is added to cart!';
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
    state.log.msgError = true;
    state.log.message = msg;
}

export const logServerErr = (state, errorMsg) => {
    state.log.loading = false;
    state.log.msgError = true;
    state.log.message = errorMsg;
}
export const forbiden = (state) => {
    state.log.msgError = true;
    state.log.message = 'Sorry you\'re restricted';
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
        state.log.message = payload.message;
        state.log.isUserActive = true;
    }
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
export const SET_ADMIN_DATA = (state, data) => {
    state.adminData = data;
}

export const UPDATE_SHIPMENT_ORDER = (state, data) => {
    state.adminData.orders = data;
    state.toast.status = 'success';
    state.toast.message = 'shipment updated successfully!';
}