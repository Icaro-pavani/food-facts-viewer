import createDataFromFile from "./createDataFromFile.js";
import saveFile from "./saveFile.js";

(async function () {
  for (let i = 1; i <= 9; i++) {
    const fileName: string = `products_0${i}.json`;
    await saveFile(fileName);
    await createDataFromFile(fileName);
  }
})();
