import type {Book} from "./product.ts";

export interface CartItem {
    book: Book;
    quantity: number;
}