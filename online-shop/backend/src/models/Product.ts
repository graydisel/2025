import mongoose from 'mongoose';
import type {Document} from "mongodb";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    id: { type: String, required: true},
    title: { type: String, required: true},
    author: { type: String, required: true},
    genre: { type: String, required: true},
    cover: { type: String, required: true},
    price:{ type: Number, required: true},
    imageUrl: { type: String},
    description: { type: String, required: true},
})

export interface IProduct extends Document {
    id: string;
    title: string;
    author: string;
    price: number;
}

export const Product = mongoose.model('Product', ProductSchema);