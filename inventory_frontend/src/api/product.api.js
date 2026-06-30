import api from "./axios";

export const createProduct = (data) => api.post("/products", data);

export const getProducts = () => api.get("/products");

export const updateStock = (id, data) =>
  api.patch(`/products/${id}/stock`, data);