import Joi from "joi";

export interface FoodUpdate {
  categories?: string;
  ingredients_text?: string;
  traces?: string;
  nutriscore_score?: number;
  nutriscore_grade?: string;
}

export const updateFoodSchema = Joi.object<FoodUpdate>({
  categories: Joi.string().allow(null),
  ingredients_text: Joi.string().allow(null),
  traces: Joi.string().allow(null),
  nutriscore_grade: Joi.string().allow(null),
  nutriscore_score: Joi.string().allow(null),
});
