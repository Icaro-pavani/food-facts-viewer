import { Router } from "express";
import { getApiInfo } from "../controllers/connectionController.js";
import {
  deleteFoodByCode,
  getFoodByCode,
  getFoods,
  updateFoodByCode,
} from "../controllers/foodsController.js";
import validateSchema from "../middlewares/validateSchema.js";
import { updateFoodSchema } from "../schemas/updateFoodSchema.js";

const router = Router();

router
  .get("/", getApiInfo)
  .get("/products", getFoods)
  .get("/products/:code", getFoodByCode)
  .delete("/products/:code", deleteFoodByCode)
  .put("/products/:code", validateSchema(updateFoodSchema), updateFoodByCode);

export default router;
