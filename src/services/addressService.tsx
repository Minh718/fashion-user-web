import axios from "axios";
const baseURL = "https://esgoo.net/api-tinhthanh";
const getProvinces = async () => {
  const res = await axios.get(baseURL + "/1/0.htm");
  return res.data.data;
};
const getDistricts = async (idProvince) => {
  const res = await axios.get(baseURL + "/2/" + idProvince + ".htm");
  return res.data.data;
};
const getWards = async (idDistrict) => {
  const res = await axios.get(baseURL + "/3/" + idDistrict + ".htm");
  return res.data.data;
};
export { getProvinces, getDistricts, getWards };
