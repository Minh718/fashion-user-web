import axios from "axios";
import { baseURL } from "../constants/baseURL";
import { handleApiResponse } from "../utils/utilApi";

const getAllCategories = async () => {
  try {
    const res = await axios.get(baseURL + "/category/all");
    return handleApiResponse(res).result;
  } catch (error) {
    console.log(error);
  }
};

export { getAllCategories };
