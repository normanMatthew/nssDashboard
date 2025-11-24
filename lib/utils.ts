import mongoose from 'mongoose';

// Load environment variables from .env file.
import dotenv from 'dotenv';
dotenv.config();

//persistent connection object (kept in module scope). Connection is declared outside function so it persists between calls.
interface Connection {
    isConnected?: number;
    db?: typeof mongoose;
}

const connection: Connection = {};

//Connect to database
export const connectToDatabase = async () => {
    const uri = process.env.CONNECTION_STRING;
    if (!uri) throw new Error("CONNECTION_STRING environment variable not set");

    //reuse existing connection
    if (connection.isConnected) {
        console.log("Using existing MongoDB database connection");
        return connection.db!;
    }

    //establish new connection
    const db = await mongoose.connect(uri);
    connection.isConnected = db.connections[0].readyState;
    connection.db = db;
    console.log("Connected to MongoDB successfully");

    return db;
}