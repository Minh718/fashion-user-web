import axios from "axios";
import { baseURL } from "../constants/baseURL";
import { handleApiResponse } from "../utils/utilApi";

const getAllCategories = async () => {
  const res = await axios.get(baseURL + "/category/all");
  return handleApiResponse(res).result;
};

export { getAllCategories };
