export interface Book {
    id: string;
    title: string;
    author: string;
    genre: string;
    cover: string;
    price: number;
    imageUrl: string;
    description: string;
}

export interface ProductFilter {
    genre?: string;
    minPrice?: number;
    maxPrice?: number;
    searchTerm?: string;
}