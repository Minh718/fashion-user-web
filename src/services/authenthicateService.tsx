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
const userSignupByEmail = async (data) => {
  try {
    const res = await axios.post(baseURL + `/auth/signin/email`, data);
    return handleApiResponse(res).result;
  } catch (e) {
    console.log(e);
  }
};
const userSignupByPhone = async (data) => {
  try {
    const res = await axios.post(baseURL + `/auth/signin/phone`, data);
    return handleApiResponse(res).result;
  } catch (e) {
    console.log(e);
  }
};
const getOtpForPhoneNumber = async (number) => {
  try {
    const res = await axios.get(baseURL + `/auth/email/getotp/${number}`);
    return handleApiResponse(res).result;
  } catch (e) {
    console.log(e);
  }
};
export {
  userLoginByGoogle,
  userLogin,
  userSignupByEmail,
  userSignupByPhone,
  getOtpForPhoneNumber,
};
