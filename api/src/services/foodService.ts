import { notFoundError } from "../middlewares/handleErrorsMiddleware.js";
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

const foodService = { obtainFoods, getFoodInfoByCode };

export default foodService;
