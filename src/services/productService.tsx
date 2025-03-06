import { baseURL } from "../constants/baseURL";
import { handleApiResponse } from "../utils/utilApi";
import axios from "axios";

export const getListProductsForHomePage = async () => {
  try {
    const res = await axios.get(baseURL + "/product/public/homepage");
    return handleApiResponse(res).result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
