import express, { type Request, type Response } from "express";
import {type IUser, User} from "../models/User.js";
import isAuthenticated from "../middleware/isAuthentificated.js";


export const cartRouter = express.Router();

interface AuthenticatedRequest extends Request {
    user?: IUser;
}

cartRouter.get('/user/cart', isAuthenticated, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const user = await User.findById(req.user!._id).populate('cart.book');
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(user.cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

cartRouter.post('/user/cart', isAuthenticated, async (req: AuthenticatedRequest, res: Response) => {
    const { bookId, quantity } = req.body;
    try {
        const user = await User.findById(req.user!._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const existingItemIndex = user.cart.findIndex(item => item.book.toString() === bookId);

        if (existingItemIndex > -1) {
            user.cart[existingItemIndex].quantity += quantity || 1;
        } else {
            user.cart.push({ book: bookId, quantity: quantity || 1 });
        }

        await user.save();

        const updatedUser = await User.findById(req.user!._id).populate('cart.book');
        res.status(200).json(updatedUser!.cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

cartRouter.delete('/user/cart/:bookId', isAuthenticated, async (req: AuthenticatedRequest, res: Response) => {
    const { bookId } = req.params;
    try {
        const user = await User.findById(req.user!._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const cartItem = user.cart.find(item => item.book.toString() === bookId);
        if (cartItem) {
            user.cart.pull(cartItem._id);
        }

        await user.save();
        const updatedUser = await User.findById(req.user!._id).populate('cart.book');

        res.status(200).json(updatedUser!.cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});