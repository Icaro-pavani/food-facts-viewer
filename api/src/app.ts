import express, { json, Express } from "express";
import "express-async-errors";
import cors from "cors";
import { connectDb } from "./config/database.js";
import router from "./routes/router.js";
import { CronJob } from "cron";
import updateDatabase from "./utils/updateDatabase.js";
import handleErrors from "./middlewares/handleErrorsMiddleware.js";

const app = express();

const job = new CronJob(
  "0 0 3 */1 * *",
  async function () {
    await updateDatabase();
  },
  null,
  true
);

app
  .use(cors())
  .use(json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use(router)
  .use(handleErrors);

export async function initialize(): Promise<Express> {
  try {
    await connectDb("food-facts");
    await updateDatabase(true);
    return Promise.resolve(app);
  } catch (error) {
    console.log(error);
  }
}

export default app;
