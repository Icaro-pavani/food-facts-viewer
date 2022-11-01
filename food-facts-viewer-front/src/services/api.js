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

const api = { getProductsByPage, getProductByCode };

export default api;
