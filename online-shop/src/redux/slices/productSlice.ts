import type {Dispatch} from 'redux';
import type {ProductFilter} from '../../types/product';
import {type ProductActionTypes, FETCH_PRODUCTS_ACTIONS, type ProductState} from '../types/productTypes';
import {booksData} from "../../server/booksData.ts";
import {createSlice} from "@reduxjs/toolkit";

export const fetchProducts = () => async (dispatch: Dispatch<ProductActionTypes>) => {
    dispatch({ type: FETCH_PRODUCTS_ACTIONS.REQUEST });
    try {
        await new Promise(resolve => setTimeout(resolve, 500));
        dispatch({ type: FETCH_PRODUCTS_ACTIONS.SUCCESS, payload: booksData });
    } catch (error: any) {
        dispatch({ type: FETCH_PRODUCTS_ACTIONS.FAILURE, payload: error.message });
        console.log(
            `Error fetching products: ${error.message}`
        )
    }
}

export const applyFilter = (filters: ProductFilter): ProductActionTypes => ({
    type: FETCH_PRODUCTS_ACTIONS.APPLY_FILTER,
    payload: filters,
});

const initialState: ProductState = {
    products: [],
    filteredProducts: [],
    loading: false,
    error: null,
    filters: {}
}

const productSlice = createSlice ({
    name: 'products',
    initialState,
    reducers: {
        fetchProducts: fetchProducts,
        applyFilter: applyFilter
    }
})