import { jest } from "@jest/globals";

import foodsRepository from "../../src/repositories/foodsRepository.js";
import foodService from "../../src/services/foodService.js";

beforeEach(() => {
  jest.resetAllMocks();
});

describe("food facts services suite", () => {
  it("get food facts documents", async () => {
    jest
      .spyOn(foodsRepository, "getFoodsByPage")
      .mockImplementation((page: number): any => {
        return [{ code: "94839" }, { code: "8374" }];
      });

    const result = await foodService.obtainFoods(1);
    expect(result).toHaveLength(2);
    expect(foodsRepository.getFoodsByPage).toBeCalledTimes(1);
  });

  it("get food fact with right code", async () => {
    jest
      .spyOn(foodsRepository, "findByCode")
      .mockImplementation((code: string): any => {
        return {
          code,
          product_name: "test",
        };
      });

    const result = await foodService.getFoodInfoByCode("112233");
    expect(result.code).toBe("112233");
    expect(result.product_name).toBe("test");
    expect(foodsRepository.findByCode).toBeCalledTimes(1);
  });

  it("fail to get food fact with wrong code", async () => {
    jest
      .spyOn(foodsRepository, "findByCode")
      .mockImplementation((code: string): any => {
        return false;
      });

    try {
      const result = await foodService.getFoodInfoByCode("12345");
      fail("Should throw not found error!");
    } catch (error) {
      expect(error).toEqual({
        name: "notFound",
        message: "Code not found!",
      });
      expect(foodsRepository.findByCode).toBeCalledTimes(1);
    }
  });

  it("remove food fact that is not removed", async () => {
    jest
      .spyOn(foodsRepository, "findByCode")
      .mockImplementation((code: string): any => {
        return {
          code,
          status: "published",
        };
      });
    jest
      .spyOn(foodsRepository, "deleteByCode")
      .mockImplementation((code: string): any => {
        return {
          code,
          status: "trash",
        };
      });

    await foodService.removeFoodByCode("122334");
    expect(foodsRepository.findByCode).toBeCalledTimes(1);
    expect(foodsRepository.deleteByCode).toBeCalledTimes(1);
  });

  it("error deleting food fact with trash status", async () => {
    jest
      .spyOn(foodsRepository, "findByCode")
      .mockImplementation((code: string): any => {
        return {
          code,
          status: "trash",
        };
      });
    try {
      await foodService.removeFoodByCode("123322");
    } catch (error) {
      expect(error).toEqual({
        name: "conflict",
        message: "Food fact already deleted!",
      });
      expect(foodsRepository.findByCode).toBeCalledTimes(1);
      expect(foodsRepository.deleteByCode).not.toBeCalled();
    }
  });

  it("update food fact info with correct fields", async () => {
    jest
      .spyOn(foodsRepository, "findByCode")
      .mockImplementation((code: string): any => {
        return {
          code,
          status: "published",
        };
      });
    jest
      .spyOn(foodsRepository, "update")
      .mockImplementation((code: string): any => {
        return true;
      });

    await foodService.updateFoodInfo("123234", {
      categories: "candy",
      status: "draft",
    });
    expect(foodsRepository.update).toBeCalled();
  });

  it("update food fact info with zero fields", async () => {
    jest
      .spyOn(foodsRepository, "findByCode")
      .mockImplementation((code: string): any => {
        return {
          code,
          status: "published",
        };
      });
    jest
      .spyOn(foodsRepository, "update")
      .mockImplementation((code: string): any => {
        return true;
      });

    await foodService.updateFoodInfo("123234", {});
    expect(foodsRepository.update).not.toBeCalled();
  });
});
