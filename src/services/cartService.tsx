import api from "../utils/axiosInterceptor";

import { baseURL } from "../constants/baseURL";
import axios from "axios";
import { handleApiResponse } from "../utils/utilApi";

const addProductToCart = async (data) => {
  await api.post(baseURL + "/cart/add", data);
};
const getAllProductOfCart = async (page) => {
  const res = await api.get(baseURL + "/cart/all?page=" + page);
  return handleApiResponse(res);
};

const removeProductFromCart = async (id) => {
  const res = await api.delete(baseURL + "/cart/" + id);
  return handleApiResponse(res);
};

export { addProductToCart, getAllProductOfCart, removeProductFromCart };
