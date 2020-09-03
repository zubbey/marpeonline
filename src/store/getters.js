export const currentCurrency = (state) => {
    const activeCurrency = state.settings.currencyType.find(currency => currency.default === true);
    return activeCurrency;
}

export const getDollarNaira = (state) => {
    const naira = state.settings.currencyType.find(currency => currency.name === 'Nigeria');
    const dollar = state.settings.currencyType.find(currency => currency.name === 'US Dollar');
    const currency = [naira, dollar];
    return currency;
}

//marge all products
export const allMarpeProducts = (state) => {
    let allProduct = [...state.productsInNigeria, ...state.productsIn1688];
    return allProduct;
}

export const cartItemCount = (state) => {
    return state.cart.length;
}

export const totalItemPrice = (state) => {
    let total = 0;
    state.cart.forEach(item => {
        total += item.product.price * item.qty
    });
    return total;
}

export const cartWeight = (state) => {
    let weight = null;
    state.cart.forEach(item => {
        weight += item.product.weight * state.settings.commission.kg;
    });
    return weight;
}

export const fullname = (state) => {
    let fname = state.user.firstname;
    let lname = state.user.lastname;
    return `${fname} ${lname}`;
}

export const registerd = (state) => {
    let createdAt = new Date(state.user.created);
    return createdAt.toDateString();
}

export const totalAffiliate = (state) => {
    if (localStorage.getItem('accessToken'))
        return state.user.affiliates.length;
    else return 0
}

export const totalAffiliatePoint = (state) => {
    let total = 0;
    if (localStorage.getItem('accessToken')) {
        let affiliates = state.user.affiliates;
        if (affiliates.length > 0) {
            affiliates.forEach(affiliate => {
                total += affiliate.point
            });
        }
        return total;
    } else return total;
}

export const getCategoryName = (state) => (id) => {
    let cat = state.categories.filter(category => category._id === id);
    console.log(cat);
}
export const slicedCat = (state) => {
    return state.categories.filter(c => c).slice(0, 6)
}

export const getContactImage = (state) => {
    const contactImg = state.settings.gallery.find(img => img.title === 'contact');
    return contactImg;
}

export const getAboutImage = (state) => {
    const contactImg = state.settings.gallery.find(img => img.title === 'about');
    return contactImg;
}

export const totalOnlypurchased = (state) => {
    let total = 0;
    state.onlypurchase.forEach(item => {
        total += item.amount
    });
    return total;
}

export const onlyPlacedOrder = (state) => {
    return state.onlypurchase.filter(placed => placed.orderPlaced === true)
}


// ######################## ADMIN ############################
export const totalUsers = (state) => {
    return state.adminData.users.length
}
export const totalOrders = (state) => {
    return state.adminData.orders.length
}
// get total number of products
export const totalProducts = (state) => {
    return state.adminData.products.length
}
// get total referred users
export const referredUsers = (state) => {
    return state.adminData.users.filter(u => u.isReffered)
}

// get Shipped Orders
export const getShippedOrders = (state) => {
    return state.adminData.orders.filter(order => order.isShipped === true);
}
export const getUnshippedOrders = (state) => {
    return state.adminData.orders.filter(order => order.isShipped === false);
}