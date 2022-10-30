import { Router } from "express";
import { getApiInfo } from "../controllers/connectionController.js";
import { getFoods } from "../controllers/foodsController.js";

const router = Router();

router.get("/", getApiInfo).get("/products", getFoods);

export default router;
