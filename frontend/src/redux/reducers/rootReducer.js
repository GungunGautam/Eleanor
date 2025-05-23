import { combineReducers } from 'redux'
import cartReducer from '.'

export const rootReducer = combineReducers({

    cart : cartReducer

})