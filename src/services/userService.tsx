import Cookies from "js-cookie";
import api from "../utils/axiosInterceptor";
import { handleApiResponse } from "../utils/utilApi";

const getMyInfo = async () => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) return null;
  try {
    const res = await api.get("/user/my-info");
    return handleApiResponse(res).result;
  } catch (err) {
    return null;
  }
};

export { getMyInfo };
