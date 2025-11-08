//set up database schema.
import mongoose from 'mongoose';

// Load environment variables from .env file.
import dotenv from 'dotenv';
dotenv.config({ path: '/app/.env' });

// Connect to MongoDB database.
export const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log('Connected to MongoDB database successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB database:', error);

        //Safely rethrow the error, preserving stack and message.
        if ( error instanceof Error ) {
            throw new Error(`Database connection failed: ${error.message}`);
        } else {
            throw new Error("An unknown error occurred during the database connection.")
        }
    }
};