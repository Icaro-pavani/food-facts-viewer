import express, { json, Express } from "express";
import cors from "cors";
import { connectDb } from "./config/database.js";
import router from "./routes/router.js";

const app = express();

app
  .use(cors())
  .use(json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use(router);

export async function initialize(): Promise<Express> {
  try {
    await connectDb("food-facts");
    return Promise.resolve(app);
  } catch (error) {
    console.log(error);
  }
}

export default app;
