import { combineReducers } from 'redux';
import productReducer from '../slices/productSlice';
import cartReducer from '../slices/cartSlice';

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;