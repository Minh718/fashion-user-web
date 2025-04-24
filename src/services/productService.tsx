import { notifyError } from "../components/toastNotify";
import { baseURL } from "../constants/baseURL";
import { handleApiResponse } from "../utils/utilApi";
import axios from "axios";

export const getListProductsForHomePage = async () => {
  try {
    const res = await axios.get(baseURL + "/product/public/homepage");
    return handleApiResponse(res).result;
  } catch (error) {
    notifyError("Error occur");
    return null;
  }
};
export const searchProducts = async (data) => {
  const res = await axios.get(baseURL + "/product/search", { params: data });
  return handleApiResponse(res);
};
export const getProductDetail = async (id) => {
  const res = await axios.get(baseURL + "/product/" + id);
  return handleApiResponse(res).result;
};
export const getPublicProducts = async (data) => {
  const res = await axios.get(baseURL + "/product/public", { params: data });
  return handleApiResponse(res);
};

export const getPublicProductsBySubCategory = async (data) => {
  const res = await axios.get(baseURL + "/product/public/subCategory", {
    params: data,
  });
  return handleApiResponse(res);
};

export const getRelatedProducts = async (id) => {
  const res = await axios.get(baseURL + "/product/related/" + id);
  return handleApiResponse(res).result;
};
