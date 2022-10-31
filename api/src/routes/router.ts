import { Router } from "express";
import { getApiInfo } from "../controllers/connectionController.js";
import { getFoodByCode, getFoods } from "../controllers/foodsController.js";

const router = Router();

router
  .get("/", getApiInfo)
  .get("/products", getFoods)
  .get("/products/:code", getFoodByCode);

export default router;
