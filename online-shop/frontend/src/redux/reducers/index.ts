import { combineReducers } from 'redux';
import productReducer from '../slices/productSlice.ts';
import cartReducer from '../slices/cartSlice.ts';

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;