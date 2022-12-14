import { Request, Response } from "express";
import { FoodUpdate } from "../schemas/updateFoodSchema.js";
import foodService from "../services/foodService.js";

export async function getFoods(req: Request, res: Response) {
  const page = req.query.page ? parseInt(req.query.page as string) : 1;

  const foods = await foodService.obtainFoods(page);

  res.status(200).send(foods);
}

export async function getFoodByCode(req: Request, res: Response) {
  const code: string = req.params.code;

  const food = await foodService.getFoodInfoByCode(code);

  res.status(200).send(food);
}

export async function deleteFoodByCode(req: Request, res: Response) {
  const code: string = req.params.code;

  await foodService.removeFoodByCode(code);

  res.sendStatus(200);
}

export async function updateFoodByCode(req: Request, res: Response) {
  const code: string = req.params.code;
  const foodUpdateInfo = req.body as FoodUpdate;

  await foodService.updateFoodInfo(code, foodUpdateInfo);

  res.sendStatus(200);
}
