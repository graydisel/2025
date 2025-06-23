import type {Book} from "../../types/product.ts";
import type {CartItem} from "../../types/cart.ts";

export const CART_ACTIONS = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART',
    UPDATE_CART_ITEM_QUANTITY: 'UPDATE_CART_ITEM_QUANTITY'
}

interface AddToCartAction {
    type: typeof CART_ACTIONS.ADD_TO_CART;
    payload: Book;
}

interface RemoveFromCartAction {
    type: typeof CART_ACTIONS.REMOVE_FROM_CART;
    payload: string; // bookId
}

interface UpdateCartItemQuantityAction {
    type: typeof CART_ACTIONS.UPDATE_CART_ITEM_QUANTITY;
    payload: {
        bookId: string;
        quantity: number;
    };
}

interface ClearCartAction {
    type: typeof CART_ACTIONS.CLEAR_CART;
}

export type CartActionTypes =
    | AddToCartAction
    | RemoveFromCartAction
    | UpdateCartItemQuantityAction
    | ClearCartAction;

export interface CartState {
    items: CartItem[];
}