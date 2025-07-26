export interface Book {
    _id: string;
    id: string;
    title: string;
    author: string;
    genre: string;
    cover: string;
    price: number;
    imageUrl: string;
    description: string;
}

export type SortOrder = 'asc' | 'desc' | undefined;

export interface ProductFilter {
    genre?: string;
    minPrice?: number;
    maxPrice?: number;
    searchTerm?: string;
    sortBy?: 'price' | 'title' | 'author' | undefined;
    sortOrder?: SortOrder;
}