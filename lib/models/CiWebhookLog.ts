import mongoose from "mongoose";

// Plain TypeScript interface (do NOT extend Document)
export interface ICiWebHookLog {
  eventType: string;
  status: "success" | "failure" | "cancelled" | string;
  repo: string;
  branch: string;
  commit: string;
  timestamp?: Date;
  raw: unknown;
}

// Mongoose schema
const CiWebhookLogSchema = new mongoose.Schema<ICiWebHookLog>({
  eventType: { type: String, required: true },
  status: { type: String, required: true },
  repo: { type: String, required: true },
  branch: { type: String, required: true },
  commit: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  raw: { type: mongoose.Schema.Types.Mixed, required: true },
});

// Fix TypeScript “create not callable” by explicitly typing the Model
const CiWebhookLog = mongoose.models.CiWebhookLog as
  | mongoose.Model<ICiWebHookLog>
  | undefined;

export default CiWebhookLog || mongoose.model<ICiWebHookLog>("CiWebhookLog", CiWebhookLogSchema);
