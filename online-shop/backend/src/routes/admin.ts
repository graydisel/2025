import express, { type Request, type Response } from 'express';
import isAuthenticated from "../middleware/isAuthentificated.js";
import isAdmin from "../middleware/isAdmin.js";
import {Product} from "../models/Product.js";


export const adminRouter = express.Router();

adminRouter.post('/admin/products', isAuthenticated, isAdmin, async (req: Request, res: Response) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

adminRouter.put('/admin/products/:id', isAuthenticated, isAdmin, async (req: Request, res: Response) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

adminRouter.delete('/admin/products/:id', isAuthenticated, isAdmin, async (req: Request, res: Response) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});