import type {Book, ProductFilter} from "../../types/product.ts";

export const FETCH_PRODUCTS_ACTIONS = {
    REQUEST: 'REQUEST',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
    APPLY_FILTER: 'APPLY_FILTER'
} as const;

interface FetchProductsRequestAction {
    type: typeof FETCH_PRODUCTS_ACTIONS.REQUEST;
}
interface FetchProductsSuccessAction {
    type: typeof FETCH_PRODUCTS_ACTIONS.SUCCESS;
    payload: Book[];
}
interface FetchProductsFailureAction {
    type: typeof FETCH_PRODUCTS_ACTIONS.FAILURE;
    payload: string;
}
interface ApplyFilterAction {
    type: typeof FETCH_PRODUCTS_ACTIONS.APPLY_FILTER;
    payload: ProductFilter;
}

export type ProductActionTypes =
    | FetchProductsRequestAction
    | FetchProductsSuccessAction
    | FetchProductsFailureAction
    | ApplyFilterAction;

export interface ProductState {
    products: Book[];
    filteredProducts: Book[];
    loading: boolean;
    error: string | null;
    filters: ProductFilter;
}