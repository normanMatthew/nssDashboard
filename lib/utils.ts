import mongoose from "mongoose";
import dotenv from "dotenv";

//Load environment variables from .env file
dotenv.config();

// Persistent connection cache interface
interface CachedConnection {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

//Extend the Node Global type
declare global {
   //eslint-disable-next-line no-var
   var mongooseCache: CachedConnection | undefined;
}

//Use cached global connection if it exists, otherwise initialize
const cached: CachedConnection = global.mongooseCache ?? { conn: null, promise: null };
global.mongooseCache = cached;

export const connectToDatabase = async (): Promise<typeof mongoose> => {
    const uri = process.env.CONNECTION_STRING;

    if (!uri) {
        throw new Error("CONNECTION_STRING environment variable has not been set yet.")
    }

    //Already connected to MongoDB Database
    if(cached.conn) {
        console.log("Using existing MongoDB database connection.");
        return cached.conn;
    }

    //MongoDB connection is already in progress.
    if(!cached.promise) {
        cached.promise = mongoose.connect(uri, {
            bufferCommands: false,
        });
    }

    cached.conn = await cached.promise;
    console.log("You have successfully connected to your MongoDB database.");

    return cached.conn;
};