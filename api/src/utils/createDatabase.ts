import { db } from "../config/database.js";
import createDataFromFile from "./createDataFromFile.js";
import saveFile from "./saveFile.js";

export default async function createDatabase() {
  const collections = await db
    .listCollections({}, { nameOnly: true })
    .toArray();

  if (collections.length === 0) {
    for (let i = 1; i <= 9; i++) {
      const fileName: string = `products_0${i}.json`;
      await saveFile(fileName);
      await createDataFromFile(fileName);
    }
  }
}
