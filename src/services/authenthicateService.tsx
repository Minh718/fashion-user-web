import axios from "axios";
import { baseURL } from "../constants/baseURL";
import { handleApiResponse } from "../utils/utilApi";

const userLoginByGoogle = async (authCode) => {
  const res = await axios.post(baseURL + `/auth/login/google?code=${authCode}`);
  return handleApiResponse(res).result;
};
const userLogin = async (data) => {
  try {
    const res = await axios.post(baseURL + `/auth/signin`, data);
    return handleApiResponse(res).result;
  } catch (e) {
    console.log(e);
  }
};
export { userLoginByGoogle, userLogin };
