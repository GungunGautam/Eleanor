

export const SET_CART_COUNT = "SET_CART_COUNT"
export const UPDATE_CART = 'UPDATE_CART'

export const setCountCart = (payload) => ({

    type : SET_CART_COUNT,
    payload : payload
})

export const updateCartAction = (payload) => ({

    type : UPDATE_CART,
    payload : payload
})

