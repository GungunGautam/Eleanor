import { SET_CART_COUNT, UPDATE_CART } from "../actions"

const CartC= localStorage.getItem("productArr") ? (JSON.parse(localStorage.getItem("productArr"))).length : 0
console.log('CartC', CartC)
const initialState = {
    cartCount :  0,
    cartItems : []
}



const cartReducer = (state = initialState, action) => { 

    switch (action.type) {
        case SET_CART_COUNT:
          return {
            ...state,
            cartCount: action.payload
          }
          case UPDATE_CART:
            return {
              ...state,
              cartReducer: action.payload
            }  
          default :
          return state
        }

}

export default cartReducer
