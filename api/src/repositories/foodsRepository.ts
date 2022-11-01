import { db } from "../config/database.js";
import { FoodUpdate } from "../schemas/updateFoodSchema.js";

export type Status = "draft" | "trash" | "published";

export interface Food {
  code: string;
  status: Status;
  imported_t: Date;
  url: string;
  creator: string;
  created_t: number;
  last_modified_t: number;
  product_name: string;
  quantity: string;
  brands: string;
  categories: string;
  labels: string;
  cities: string;
  purchase_places: string;
  stores: string;
  ingredients_text: string;
  traces: string;
  serving_size: string;
  serving_quantity: number;
  nutriscore_score: number;
  nutriscore_grade: string;
  main_category: string;
  image_url: string;
}

async function getFoodsByPage(page: number) {
  const itemsPage = 20;
  return db
    .collection<Food[]>("foods")
    .find({ status: { $ne: "trash" } })
    .skip((page - 1) * 20)
    .limit(itemsPage)
    .toArray();
}

async function findByCode(code: string) {
  return db.collection<Food>("foods").findOne({ code });
}

async function deleteByCode(code: string) {
  await db
    .collection("foods")
    .updateOne({ code }, { $set: { status: "trash" } });
}
async function update(code: string, foodUpdateData: FoodUpdateData) {
  await db.collection("foods").updateOne({ code }, { $set: foodUpdateData });
}

export type FoodUpdateData = FoodUpdate & {
  last_modified_t: number;
};

const foodsRespository = { getFoodsByPage, findByCode, deleteByCode, update };

export default foodsRespository;
