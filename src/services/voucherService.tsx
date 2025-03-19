import { baseURL } from "../constants/baseURL";
import api from "../utils/axiosInterceptor";
import { handleApiResponse } from "../utils/utilApi";

export const getUserVouchers = async ({ page, size = 5 }) => {
  try {
    const res = await api.get(
      baseURL + "/vouchers/user/get?page=" + page + "&size=" + size
    );
    return handleApiResponse(res).result;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUserVouchers = async () => {
  try {
    const res = await api.get(baseURL + "/vouchers/user/all");
    return handleApiResponse(res).result;
  } catch (error) {
    console.log(error);
  }
};
