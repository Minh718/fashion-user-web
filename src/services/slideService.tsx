import { baseURL } from "../constants/baseURL";
import api from "../utils/axiosInterceptor";
import { handleApiResponse } from "../utils/utilApi";

export const getPublicSlides = async () => {
  const res = await api.get(baseURL + "/slide/all/public");
  return handleApiResponse(res).result;
};
