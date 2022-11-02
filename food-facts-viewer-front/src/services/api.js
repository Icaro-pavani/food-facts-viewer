import axios from "axios";

const baseAPI = axios.create({
  baseURL: process.env.REACT_APP_API,
});

async function getProductsByPage(page) {
  return baseAPI.get(`/products?page=${page}`);
}

async function getProductByCode(code) {
  return baseAPI.get(`/products/${code}`);
}

async function deleteProductByCode(code) {
  await baseAPI.delete(`/products/${code}`);
}

async function updateFoodFact(code, updateData) {
  await baseAPI.put(`/products/${code}`, updateData);
}

const api = {
  getProductsByPage,
  getProductByCode,
  deleteProductByCode,
  updateFoodFact,
};

export default api;
