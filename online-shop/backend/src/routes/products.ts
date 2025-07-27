import {getFilteredBooks} from "../services/books.js";
import express, { type Request, type Response } from "express";
import { Product } from "../models/Product.js";

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
});

productsRouter.get("/products/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching single book:', error);
        if (error instanceof Error && error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid book ID format.' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
});