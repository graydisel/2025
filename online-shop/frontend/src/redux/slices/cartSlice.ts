import type {Book} from '../../types/product.ts';
import type {CartState} from "../types/cartTypes.ts";
import {createAsyncThunk, createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from "../reducers";
import api from "../../services/api.ts";

export interface CartItem {
    book: Book;
    quantity: number;
}

const initialState: CartState = {
    items: [],
    status: 'idle',
    error: null,
};

export const fetchCartItems = createAsyncThunk<CartItem[], void, { state: RootState }>(
    'cart/fetchCartItems',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/user/cart');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart.');
        }
    }
);

export const addToCart = createAsyncThunk<CartItem[], { bookId: string; quantity?: number }, { state: RootState }>(
    'cart/addToCart',
    async ({ bookId, quantity }, { rejectWithValue }) => {
        try {
            const response = await api.post('/user/cart', { bookId, quantity });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add item to cart.');
        }
    }
);

export const removeFromCart = createAsyncThunk<CartItem[], string, { state: RootState }>(
    'cart/removeFromCart',
    async (bookId, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/user/cart/${bookId}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to remove item from cart.');
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.items = [];
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCartItems.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(removeFromCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
            });
    }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;

