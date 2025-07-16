import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config();

const MONGO_DB: string | undefined = process.env.MONGO_DB;
const DATABASE_NAME = 'online_shop';

export async function dbConnect() {
    try {
        if (MONGO_DB !== undefined) {
            await mongoose.connect(MONGO_DB,
                {dbName: DATABASE_NAME});
        }
        console.log(`Connected to database: ${mongoose.connection.name}`);
        console.log(`Connection host: ${mongoose.connection.host}`);
        console.log(`Connection port: ${mongoose.connection.port}`);
    } catch (error) {
        console.error('Error:', error);
    }
}