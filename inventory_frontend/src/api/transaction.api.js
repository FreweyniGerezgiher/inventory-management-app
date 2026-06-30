import api from "./axios";

export const getTransactions = (page = 1, size = 10) =>
  api.get(`/transactions?page=${page}&size=${size}`);