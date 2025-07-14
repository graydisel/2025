import {Product} from "../models/Product.ts";
import type {ProductFilter} from "../../../src/types/product.js";

export type PriceQuery = {
    $gte?: number,
    $lte?: number
}

export type Query = {
    genre?: string;
    price?: PriceQuery;
    $or?: Array<Record<string, unknown>>;
}


export async function getFilteredBooks(filters: ProductFilter) {
    const query: Query = {};

    if (filters.genre && filters.genre !== '' && filters.genre !== 'all') {
        query.genre = filters.genre;
    }

    const priceQuery: PriceQuery = {};

    if (filters.minPrice) {
        priceQuery.$gte = Number(filters.minPrice);
    }
    if (filters.maxPrice) {
        priceQuery.$lte = Number(filters.maxPrice);
    }
    if (Object.keys(priceQuery).length > 0) {
        query.price = priceQuery;
    }

    if (filters.searchTerm) {
        const searchTermRegex = new RegExp(filters.searchTerm, 'i');
        query.$or = [
            { title: { $regex: searchTermRegex } },
            { author: { $regex: searchTermRegex } },
        ];
    }

    console.log('Mongoose Query Object:', query);

    return await Product.find(query).exec();
}