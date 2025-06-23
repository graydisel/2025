import type {Book} from '../../types/product';
import {type CartActionTypes, CART_ACTIONS} from '../types/cartTypes';

export const addToCart = (book: Book): CartActionTypes => ({
    type: CART_ACTIONS.ADD_TO_CART,
    payload: book,
});

export const removeFromCart = (bookId: string): CartActionTypes => ({
    type: CART_ACTIONS.REMOVE_FROM_CART,
    payload: bookId,
});

export const clearCart = (): CartActionTypes => ({
    type: CART_ACTIONS.CLEAR_CART,
});

export const updateCartItemQuantity = (bookId: string, quantity: number): CartActionTypes => ({
    type: CART_ACTIONS.UPDATE_CART_ITEM_QUANTITY,
    payload: {
        bookId,
        quantity,
    },
});