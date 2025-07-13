import {Product} from "../models/Product.ts";
import type {ProductFilter} from "../../../src/types/product.js";

export type PriceQuery = {
    $gte: null | number,
    $lte: null | number
}

export type Query = {
    genre: string | null,
    price: null | PriceQuery,
    $or: null | [{},{}]
}


export async function getFilteredBooks(filters: ProductFilter) {
    let query: Query = {
        genre: null,
        price: null,
        $or: null
    };

    if (filters.genre && filters.genre !== '' && filters.genre !== 'all') { // Учитываем пустую строку и "all" как отсутствие фильтра
        query.genre = filters.genre;
    }

    const priceQuery: PriceQuery = {
        $gte: null,
        $lte: null
    };
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

    return await Product.find({query}).exec();
}