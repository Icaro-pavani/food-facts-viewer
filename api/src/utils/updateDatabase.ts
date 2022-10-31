import { db } from "../config/database.js";
import createDataFromFile from "./createDataFromFile.js";
import createDataToUpdate from "./createDataToUpdate.js";
import saveFile from "./saveFile.js";

export default async function updateDatabase(creation = false) {
  const collections = await db
    .listCollections({}, { nameOnly: true })
    .toArray();

  for (let i = 1; i <= 9; i++) {
    const fileName: string = `products_0${i}.json`;
    if (collections.length === 0) {
      await saveFile(fileName);
      await createDataFromFile(fileName);
    } else if (!creation) {
      await saveFile(fileName);
      await createDataToUpdate(fileName);
    }
  }
}
