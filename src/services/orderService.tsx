import { baseURL } from "../constants/baseURL";
import api from "../utils/axiosInterceptor";
import { handleApiResponse } from "../utils/utilApi";

export const fetchOrders = async (data, filterStatus) => {
  let res;
  if (filterStatus === "all") {
    res = await api.get(baseURL + "/order/all", {
      params: data,
    });
  } else {
    res = await api.get(baseURL + "/order/filter/" + filterStatus, {
      params: data,
    });
  }
  return handleApiResponse(res);
};
export const getDetailOrder = async (id) => {
  const res = await api.get(baseURL + "/order/detail/" + id);
  return handleApiResponse(res).result;
};
export const saveOrder = async (data) => {
  const res = await api.post(baseURL + "/order/save", data);
  return handleApiResponse(res).result;
};
