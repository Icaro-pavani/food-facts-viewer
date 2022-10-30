import { Router } from "express";
import { getApiInfo } from "../controllers/connectionController.js";

const router = Router();

router.get("/", getApiInfo);

export default router;
