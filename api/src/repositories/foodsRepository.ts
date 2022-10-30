import { db } from "../config/database.js";

type Status = "draft" | "trash" | "publihed";

interface Food {
  code: string;
  status: Status;
  imported_t: Date;
  url: string;
  creator: string;
  created_t: Date;
  last_modified_t: Date;
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
    .find()
    .skip((page - 1) * 20)
    .limit(itemsPage)
    .toArray();
}

const foodsRespository = { getFoodsByPage };

export default foodsRespository;
