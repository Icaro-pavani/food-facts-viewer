import { createReadStream, unlink } from "fs";
import { createInterface } from "readline";
import { db } from "../config/database.js";
import { Food } from "../repositories/foodsRepository.js";

export default async function createDataToUpdate(fileName: string) {
  const readStream = createReadStream(fileName);
  const lineReader = createInterface({ input: readStream });

  let count = 0;

  lineReader.on("line", async (line) => {
    if (count >= 100) {
      lineReader.close();
      readStream.close;
      return;
    }
    count++;

    const product = JSON.parse(line);
    const productInfo: Food = {
      code: product.code.replace('"', ""),
      status: "published",
      imported_t: new Date(),
      url: product.url,
      creator: product.creator,
      created_t: parseInt(product.created_t),
      last_modified_t: parseInt(product.last_modified_t),
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
      serving_quantity: parseFloat(product.serving_quantity)
        ? parseFloat(product.serving_quantity)
        : 0,
      nutriscore_score: parseInt(product.nutriscore_score)
        ? parseInt(product.nutriscore_score)
        : 0,
      nutriscore_grade: product.nutriscore_grade,
      main_category: product.main_category,
      image_url: product.image_url,
    };

    const foodRegistered = await db
      .collection<Food>("foods")
      .findOne({ code: productInfo.code });

    if (!foodRegistered) {
      await db.collection("foods").insertOne(productInfo);
    } else if (foodRegistered.last_modified_t <= productInfo.last_modified_t) {
      await db
        .collection("foods")
        .updateOne({ code: productInfo.code }, { $set: productInfo });
    }
  });

  lineReader.on("error", (error) => {
    console.log("Data Sync error: ", error);
  });

  lineReader.on("close", async () => {
    try {
      const importData = {
        fileName,
        importDate: new Date(),
      };
      await db
        .collection("imports")
        .updateOne(
          { fileName: importData.fileName },
          { $set: { importDate: importData.importDate } }
        );
      unlink(fileName, (error) => {
        if (error) {
          console.log(error);
        }
      });
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  });
}
