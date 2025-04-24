import axios from "axios";
import { baseURL } from "../constants/baseURL";
import { handleApiResponse } from "../utils/utilApi";

const userLoginByGoogle = async (authCode) => {
  const res = await axios.post(
    baseURL + `/auth/signin/google?code=${authCode}`
  );
  return handleApiResponse(res).result;
};
const userLogin = async (data) => {
  const res = await axios.post(baseURL + `/auth/signin`, data);
  return handleApiResponse(res).result;
};
const userSignupByEmail = async (data) => {
  const res = await axios.post(baseURL + `/auth/signup/email`, data);
  return handleApiResponse(res).result;
};
const userSignupByPhone = async (data) => {
  const res = await axios.post(baseURL + `/auth/signup/phone`, data);
  return handleApiResponse(res).result;
};
const getOtpForPhoneNumber = async (number) => {
  const res = await axios.get(baseURL + `/auth/email/getotp/${number}`);
  return handleApiResponse(res).result;
};
export {
  userLoginByGoogle,
  userLogin,
  userSignupByEmail,
  userSignupByPhone,
  getOtpForPhoneNumber,
};
