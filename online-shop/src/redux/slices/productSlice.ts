import type {Book, ProductFilter} from '../../types/product';
import { type ProductState} from '../types/productTypes';
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import api from "../../services/api.ts";
import axios from "axios";

export const fetchProducts = createAsyncThunk<
    Book[], ProductFilter | undefined, { rejectValue: string; state: { products: ProductState } } >
('products/fetchProducts', async (filters, { rejectWithValue, getState }) => {
    try {
        const currentFilters = filters || getState().products.filters;
        const response = await api.get<Book[]>('/products', { params: currentFilters});
        return response.data;
    } catch (error) {
        let errorMessage = 'Failed to fetch products';

        if (axios.isAxiosError(error)) {
            if (error.response) {
                errorMessage = (error.response.data as { message?: string })?.message || `Server error: ${error.response.status}`;
            } else if (error.request) {
                errorMessage = 'No response from server. Check your internet connection or server address.';
            } else {
                errorMessage = error.message;
            }
        } else if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === 'string') {
            errorMessage = error;
        } else if (error && typeof error === 'object' && 'message' in error) {
            errorMessage = (error as { message: string }).message;
        }

        return rejectWithValue(errorMessage);
    }
});


export const initialState: ProductState = {
    products: [],
    filteredProducts: [],
    loading: false,
    error: null,
    filters: {}
}


const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setFilters(state, action: PayloadAction<ProductFilter>) {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters(state) {
            state.filters = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Book[]>) => {
                state.loading = false;
                state.products = action.payload;
                state.filteredProducts = action.payload;
                state.error = null;
            })
            .addCase(fetchProducts.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || 'Failed to load products.';
            })
    }
});

export const {setFilters, clearFilters} = productSlice.actions;
export default productSlice.reducer;