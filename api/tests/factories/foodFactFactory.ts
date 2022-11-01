import { db } from "../../src/config/database.js";

async function createTwoFoodFacts() {
  const foodFacts = [
    {
      code: "283781",
      status: "published",
      product_name: "cookies",
    },
    {
      code: "329489",
      status: "published",
      product_name: "candy bar",
    },
  ];

  await db.collection("foods").insertMany(foodFacts);

  return foodFacts;
}

async function createDeletedFoodFact() {
  const deletedFoodFact = {
    code: "283781",
    status: "trash",
    product_name: "cookies",
  };

  await db.collection("foods").insertOne(deletedFoodFact);

  return deletedFoodFact;
}

const foodFactFactory = { createTwoFoodFacts, createDeletedFoodFact };
export default foodFactFactory;
