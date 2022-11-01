import supertest from "supertest";

import app from "../../src/app.js";
import { connectDb, db, disconnectDb } from "../../src/config/database.js";
import { Food } from "../../src/repositories/foodsRepository.js";
import foodFactFactory from "../factories/foodFactFactory.js";

const agent = supertest(app);

beforeAll(async () => {
  await connectDb("foods-facts-test");
});

beforeEach(async () => {
  db.collection("foods").deleteMany({});
  db.collection("imports").deleteMany({});
});

describe("get food facts test suite", () => {
  it("get all products without page or page 1", async () => {
    const foodFacts = await foodFactFactory.createTwoFoodFacts();
    const response = await agent.get("/products");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  it("get none products with page greater than 1", async () => {
    const foodFacts = await foodFactFactory.createTwoFoodFacts();
    const response = await agent.get("/products?page=2");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(0);
  });

  it("get one food fact by code", async () => {
    const foodFacts = await foodFactFactory.createTwoFoodFacts();
    const response = await agent.get(`/products/${foodFacts[0].code}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(foodFacts[0].code);
  });

  it("get none food fact with wrong code", async () => {
    const foodFacts = await foodFactFactory.createTwoFoodFacts();
    const response = await agent.get("/products/834758");
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe("Code not found!");
  });

  it("delete food fact by code", async () => {
    const foodFacts = await foodFactFactory.createTwoFoodFacts();
    const response = await agent.get(`/products/${foodFacts[0].code}`);
    expect(response.statusCode).toBe(200);
    const foodFactDeleted = await db
      .collection<Food>("foods")
      .findOne({ status: "trash" });
    if (foodFactDeleted) {
      expect(foodFactDeleted.code).toBe(foodFacts[0].code);
    }
  });

  it("fail to delete food fact already deleted", async () => {
    const foodFact = await foodFactFactory.createDeletedFoodFact();
    const response = await agent.delete(`/products/${foodFact.code}`);
    expect(response.statusCode).toBe(409);
    expect(response.text).toBe("Food fact already deleted!");
  });

  it("edit one food fact by code", async () => {
    const foodFacts = await foodFactFactory.createTwoFoodFacts();
    const response = await agent
      .put(`/products/${foodFacts[0].code}`)
      .send({ status: "draft" });

    expect(response.statusCode).toBe(200);

    const foodFactUpdated = await db
      .collection<Food>("foods")
      .findOne({ status: "draft" });
    if (foodFactUpdated) {
      expect(foodFactUpdated.code).toBe(foodFacts[0].code);
    }
  });

  it("fail to edit one food fact with wrong status", async () => {
    const foodFacts = await foodFactFactory.createTwoFoodFacts();
    const response = await agent
      .put(`/products/${foodFacts[0].code}`)
      .send({ status: "test" });

    expect(response.statusCode).toBe(422);
  });
});

afterAll(async () => {
  await disconnectDb();
});
