import mongoose from 'mongoose';

// Load environment variables from .env file.
import dotenv from 'dotenv';
dotenv.config({ path: '/app/.env' });

//persistent connection object (kept in module scope). Connection is declared outside function so it persists between calls.
interface Connection {
    isConnected?: number;
}

const connection: Connection = {};

// Connect to MongoDB database.
export const connectToDatabase = async () => {
    //Check if already connected. If so, reuse existing connection.
    if (connection.isConnected) {
        console.log('Using existing MongoDB database connection');
        return;
    }

    try {
        const db = await mongoose.connect(process.env.CONNECTION_STRING);

        //Retrieve connection status.
        connection.isConnected = db.connections[0].readyState;

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