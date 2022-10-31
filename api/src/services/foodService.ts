import {
  conflictError,
  notFoundError,
} from "../middlewares/handleErrorsMiddleware.js";
import foodsRespository from "../repositories/foodsRepository.js";

async function obtainFoods(page: number) {
  const foods = await foodsRespository.getFoodsByPage(page);

  return foods;
}

async function getFoodInfoByCode(code: string) {
  const food = await foodsRespository.findByCode(code);

  if (!food) {
    throw notFoundError("Code not found!");
  }

  return food;
}

async function removeFoodByCode(code: string) {
  const food = await foodsRespository.findByCode(code);

  if (!food) {
    throw notFoundError("Code not found!");
  }

  if (food.status === "trash") {
    throw conflictError("Food fact already deleted!");
  }

  await foodsRespository.deleteByCode(code);
}

const foodService = { obtainFoods, getFoodInfoByCode, removeFoodByCode };

export default foodService;
