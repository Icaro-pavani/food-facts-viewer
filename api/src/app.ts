import express, { json, Express } from "express";
import "express-async-errors";
import cors from "cors";
import { connectDb } from "./config/database.js";
import router from "./routes/router.js";
import { CronJob } from "cron";
import updateDatabase from "./utils/updateDatabase.js";
import handleErrors from "./middlewares/handleErrorsMiddleware.js";
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";

const app = express();

const swaggerDocs = JSON.parse(readFileSync("./src/swagger.json", "utf8"));

app
  .use(cors())
  .use(json())
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
  .get("/health", (_req, res) => res.send("OK!"))
  .use(router)
  .use(handleErrors);

export async function initialize(): Promise<Express> {
  try {
    await connectDb("food-facts");
    await updateDatabase(true);

    const job = new CronJob(
      "0 0 3 */1 * *",
      async function () {
        await updateDatabase();
      },
      null,
      true
    );

    return Promise.resolve(app);
  } catch (error) {
    console.log(error);
  }
}

export default app;
