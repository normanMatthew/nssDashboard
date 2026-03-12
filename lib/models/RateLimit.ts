// The idea is to store recent request timestamps per client(IP) and prune old ones inside the time window. Each document represents a client identity(usually IP).
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRateLimit extends Document { 
    key: string;
    createdAt: Date;
}

const RateLimitSchema = new Schema<IRateLimit>({
    key: { type: String, required: true, index: true },
    createdAt: { type: Date, default: Date.now, expires: 60 },
});


const RateLimit: Model<IRateLimit> =
    mongoose.models.RateLimit ||
    mongoose.model<IRateLimit>("RateLimit", RateLimitSchema);

export default RateLimit;