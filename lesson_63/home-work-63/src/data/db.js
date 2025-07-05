import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config();

const MONGO_DB = process.env.MONGO_DB;
const client = new MongoClient(MONGO_DB);

export let db;

export async function dbConnect() {
    try {
        await client.connect();

        db = client.db('testDataBase');
    } catch (error) {
        console.error('Error:', error);
    }
}