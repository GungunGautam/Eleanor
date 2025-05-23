// ** Redux Imports
import {thunk} from "redux-thunk";
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './reducers/rootReducer';

// ** Root Reducer Import
// import rootReducer from './reducers/rootReducer';
// ** Middleware Array
const middleware = [thunk];

// ** Redux Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// ** Create Store
const store = createStore(
  rootReducer, // Using rootReducer directly
  composeEnhancers(applyMiddleware(...middleware))
);

export { store };
