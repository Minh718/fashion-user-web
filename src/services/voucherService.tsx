import { baseURL } from "../constants/baseURL";
import api from "../utils/axiosInterceptor";
import { handleApiResponse } from "../utils/utilApi";

export const getUserVouchers = async ({ page, size = 5 }) => {
  const res = await api.get(
    baseURL + "/vouchers/user/get?page=" + page + "&size=" + size
  );
  return handleApiResponse(res).result;
};

export const getAllUserVouchers = async () => {
  const res = await api.get(baseURL + "/vouchers/user/all");
  return handleApiResponse(res).result;
};
