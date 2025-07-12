import type {Book} from '../../types/product';
import type {CartState} from "../types/cartTypes.ts";
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Book>) => {
            const bookToAdd = action.payload;
            const existingItem = state.items.find(item => item.book.id === bookToAdd.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ book: bookToAdd, quantity: 1 });
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.book.id !== action.payload);
        },
        updateCartItemQuantity: (state, action: PayloadAction<{ bookId: string; quantity: number }>) => {
            const {bookId, quantity} = action.payload;
            const itemToUpdate = state.items.find(item => item.book.id === bookId);

            if (itemToUpdate) {
                if (quantity <= 0) {
                    state.items = state.items.filter(item => item.book.id !== bookId);
                } else {
                    itemToUpdate.quantity = quantity;
                }
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    }
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

