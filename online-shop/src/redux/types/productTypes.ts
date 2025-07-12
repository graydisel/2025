import type {Book, ProductFilter} from "../../types/product.ts";


export interface ProductState {
    products: Book[];
    filteredProducts: Book[];
    loading: boolean;
    error: string | null;
    filters: ProductFilter;
}