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
    const sort: { [key: string]: 1 | -1 } = {};

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
        const searchTermString = String(filters.searchTerm);
        const searchTermRegex = new RegExp(searchTermString, 'i');
        query.$or = [
            { title: { $regex: searchTermRegex } },
            { author: { $regex: searchTermRegex } },
        ];
    }

    if (filters.sortBy) {
        const validSortByFields = ['price', 'title', 'author'];
        if (validSortByFields.includes(filters.sortBy)) {
            sort[filters.sortBy] = filters.sortOrder === 'desc' ? -1 : 1;
        } else {
            console.warn(`Invalid sortBy field received: ${filters.sortBy}`);
        }
    }

    console.log('Mongoose Query Object:', query);
    console.log('Mongoose Sort Object:', sort);

    return await Product.find(query).sort(sort).exec();
}