import { createReadStream, unlink } from "fs";
import { createInterface } from "readline";
import { connectDb, db, disconnectDb } from "../config/database.js";
import dayjs from "dayjs";

export default async function createDataFromFile(fileName: string) {
  try {
    await connectDb("food-facts");
  } catch (error) {
    console.log(error);
  }

  const readStream = createReadStream(fileName);
  const lineReader = createInterface({ input: readStream });

  let count = 0;

  const products = [];

  lineReader.on("line", (line) => {
    if (count >= 100) {
      lineReader.close();
      readStream.close;
      return;
    }
    count++;

    const product = JSON.parse(line);
    const productInfo = {
      code: product.code,
      status: "published",
      imported_t: dayjs(Date.now())["$d"],
      url: product.url,
      creator: product.creator,
      created_t: product.created_t,
      last_modified_t: product.last_modified_t,
      product_name: product.product_name,
      quantity: product.quantity,
      brands: product.brands,
      categories: product.categories,
      labels: product.labels,
      cities: product.cities,
      purchase_places: product.purchase_places,
      stores: product.stores,
      ingredients_text: product.ingredients_text,
      traces: product.traces,
      serving_size: product.serving_size,
      serving_quantity: product.serving_quantity,
      nutriscore_score: product.nutriscore_score,
      nutriscore_grade: product.nutriscore_grade,
      main_category: product.main_category,
      image_url: product.image_url,
    };

    products.push(productInfo);
  });

  lineReader.on("close", async () => {
    const importData = {
      fileName,
      importDate: dayjs(Date.now())["$d"] as Date,
    };
    await db.collection("imports").insertOne(importData);
    await db.collection("foods").insertMany(products);
    await disconnectDb();
    unlink(fileName, (error) => {
      if (error) {
        console.log(error);
      }
    });
    return false;
  });
}
