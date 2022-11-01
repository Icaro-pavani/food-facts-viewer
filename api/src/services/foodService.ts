import {
  conflictError,
  notFoundError,
} from "../middlewares/handleErrorsMiddleware.js";
import foodsRespository from "../repositories/foodsRepository.js";
import { FoodUpdate } from "../schemas/updateFoodSchema.js";

async function obtainFoods(page: number) {
  const foods = await foodsRespository.getFoodsByPage(page);

  return foods;
}

async function getFoodInfoByCode(code: string) {
  const food = await checkFoodCode(code);

  return food;
}

async function removeFoodByCode(code: string) {
  const food = await checkFoodCode(code);

  if (food.status === "trash") {
    throw conflictError("Food fact already deleted!");
  }

  await foodsRespository.deleteByCode(code);
}

async function updateFoodInfo(code: string, foodUpdateInfo: FoodUpdate) {
  await checkFoodCode(code);

  const {
    categories,
    ingredients_text,
    nutriscore_grade,
    nutriscore_score,
    traces,
    status,
  } = foodUpdateInfo;

  if (
    !!categories ||
    !!ingredients_text ||
    !!nutriscore_grade ||
    !!nutriscore_score ||
    !!traces ||
    !!status
  ) {
    await foodsRespository.update(code, {
      ...foodUpdateInfo,
      last_modified_t: Math.floor(new Date().getTime() / 1000),
    });
  }
}

async function checkFoodCode(code: string) {
  const food = await foodsRespository.findByCode(code);

  if (!food) {
    throw notFoundError("Code not found!");
  }

  return food;
}

const foodService = {
  obtainFoods,
  getFoodInfoByCode,
  removeFoodByCode,
  updateFoodInfo,
};

export default foodService;
