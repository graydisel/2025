import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config();

const MONGO_DB = process.env.MONGO_DB;
const DATABASE_NAME = 'testDataBase';

export let db;

export async function dbConnect() {
    try {
        await mongoose.connect(MONGO_DB,
            { dbName: DATABASE_NAME });
        console.log(`Mongoose DB Connected! to ${DATABASE_NAME} database`);
    } catch (error) {
        console.error('Error:', error);
    }
}