import { combineReducers } from 'redux';
import productReducer from '../slices/productSlice.ts';
import cartReducer from '../slices/cartSlice.ts';
import authReducer from '../slices/authSlice.ts';

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
    auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;