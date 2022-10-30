import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.MONGO_URL || "mongodb://localhost:27017";
let mongoClient = new MongoClient(DB_URL);

export let db: Db;

export async function connectDb(dbName: string): Promise<void> {
  await mongoClient.connect();
  db = mongoClient.db(dbName);
}

export async function disconnectDb(): Promise<void> {
  await mongoClient.close();
}
