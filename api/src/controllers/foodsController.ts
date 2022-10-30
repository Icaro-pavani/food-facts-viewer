import { Request, Response } from "express";
import foodService from "../services/foodService.js";

export async function getFoods(req: Request, res: Response) {
  const page = req.query.page ? parseInt(req.query.page as string) : 1;

  const foods = await foodService.obtainFoods(page);

  res.status(200).send(foods);
}
