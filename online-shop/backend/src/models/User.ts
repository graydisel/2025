import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

export interface IUser extends Document {
    name: string;
    username: string;
    email: string;
    password: string;
}

export const User = mongoose.model('User', UserSchema);
