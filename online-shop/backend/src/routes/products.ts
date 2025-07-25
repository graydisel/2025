import {getFilteredBooks} from "../services/books.js";
import express from "express";

export const productsRouter = express.Router();

productsRouter.get("/products", async (req, res) => {
    console.log('Received filters:', req.query);
    try {
        const filteredBooks = await getFilteredBooks(req.query);
        res.json(filteredBooks);
    } catch (error: unknown) {
        console.error('Error fetching products:', error);
        let errorMessage = 'An unknown error occurred.';
        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === 'string') {
            errorMessage = error;
        }
        res.status(500).json({ message: 'Error fetching products', error: errorMessage });
    }
})