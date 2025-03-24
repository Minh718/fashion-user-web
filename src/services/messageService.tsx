import { baseURL } from "../constants/baseURL";
import api from "../utils/axiosInterceptor";
import { handleApiResponse } from "../utils/utilApi";

const userGetMessages = async (size) => {
  const res = await api.get(baseURL + "/messages/user/get?size=" + size);
  return handleApiResponse(res).result;
};
const userSendMessage = async (message) => {
  const res = await api.post(baseURL + "/messages/user/send", { message });
  return handleApiResponse(res).result;
};

const getInfoChatBox = async () => {
  const res = await api.get(baseURL + "/messages/infoChatBox");
  return handleApiResponse(res).result;
};
export { userGetMessages, userSendMessage, getInfoChatBox };
