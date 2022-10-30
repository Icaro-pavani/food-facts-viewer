import foodsRespository from "../repositories/foodsRepository.js";

async function obtainFoods(page: number) {
  const foods = await foodsRespository.getFoodsByPage(page);

  return foods;
}

const foodService = { obtainFoods };

export default foodService;
