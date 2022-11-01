import Joi from "joi";
import { Status } from "../repositories/foodsRepository.js";

export interface FoodUpdate {
  categories?: string;
  ingredients_text?: string;
  traces?: string;
  nutriscore_score?: number;
  nutriscore_grade?: string;
  status?: Status;
}

export const updateFoodSchema = Joi.object<FoodUpdate>({
  categories: Joi.string().allow(null),
  ingredients_text: Joi.string().allow(null),
  traces: Joi.string().allow(null),
  nutriscore_grade: Joi.string().allow(null),
  nutriscore_score: Joi.string().allow(null),
  status: Joi.string().valid("draft", "published").allow(null),
});
