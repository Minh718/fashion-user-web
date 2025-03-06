import Cookies from "js-cookie";
import api from "../utils/axiosInterceptor";

const getMyInfo = async () => {
  const idUser = Cookies.get("x-user-id");
  if (!idUser) return null;
  try {
    const res = await api.get("/user/my-info");
    return res;
  } catch (err) {
    return null;
  }
};

export { getMyInfo };
