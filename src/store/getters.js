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
    return state.user.affiliates.length
}

export const totalAffiliatePoint = (state) => {
    let total = 0;
    let affiliates = state.user.affiliates;
    if(affiliates.length > 0){
        affiliates.forEach(affiliate => {
            total += affiliate.point
        });
    }
    return total;
}

// get total number od users
export const totalUsers = (state) => {
    return state.users.length
}
// get total number of products
export const totalProducts = (state) => {
    return state.products.length
}

// get total referred users
export const referredUsers = (state) => {
    return state.users.filter(u => u.isReffered)
}

export const getCategoryName = (state, id) => {
    return state.categories.filter(cn => {
        return cn._id === id
    })
}