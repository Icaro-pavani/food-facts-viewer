import { Router } from "express";
import { getApiInfo } from "../controllers/connectionController.js";
import {
  deleteFoodByCode,
  getFoodByCode,
  getFoods,
} from "../controllers/foodsController.js";

const router = Router();

router
  .get("/", getApiInfo)
  .get("/products", getFoods)
  .get("/products/:code", getFoodByCode)
  .delete("/products/:code", deleteFoodByCode);

export default router;
