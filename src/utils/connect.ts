import mongoose from "mongoose";
import { config } from "dotenv";

config();
const uri = process.env.MONGO_URI as string;

export async function connectToDb(): Promise<void> {
  try {
    await mongoose.connect(uri, { dbName: process.env.DB_NAME });
    console.log("Connected to mongoDB...");
  } catch (err: any) {
    throw {
      message: err.message,
      ok: err.ok,
      code: err.code,
      codeName: err.codeName,
    };
  }
}
