import mongoose from 'mongoose';

// Load environment variables from .env file.
import dotenv from 'dotenv';
dotenv.config();

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

    const uri = process.env.CONNECTION_STRING;
    if (!uri) {
        throw new Error(
            "Database connection failed: CONNECTION_STRING environment variable not set"
        );
    }

    try {
        const db = await mongoose.connect(uri);

        //Retrieve connection status.
        connection.isConnected = db.connections[0].readyState;

        console.log('Connected to MongoDB database successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB database:', error);
        //Safely rethrow the error, preserving stack and message.
        throw error instanceof Error
        ? new Error(`Database connection failed: ${error.message}`)
        : new Error("Unknown database connection error");
    }
}