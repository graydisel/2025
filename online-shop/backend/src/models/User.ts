import mongoose, { Document } from 'mongoose';
import type {IProduct} from "./Product.js";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: [
        {
            book: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
        },
    ],
})

interface ICartItem {
    book: mongoose.Types.ObjectId | IProduct;
    quantity: number;
}

export interface IUser extends Document {
    name: string;
    username: string;
    email: string;
    password: string;
    cartItems: ICartItem[];
}

export const User = mongoose.model('User', UserSchema);
