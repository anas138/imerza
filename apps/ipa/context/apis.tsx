import axios from "axios";
import Config from "../public/config.json";
export const getRequest = async (endPoint) => {
  try {
    const url = `${Config.baseUrl2}${endPoint}`;
    const response = await axios.get(url);
    if (response) {
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postRequest = async (endPoint: string, data: any) => {
  try {
    const url = `${Config.baseUrl2}${endPoint}`;
    const response = await axios.post(url, { ...data });
    if (response) {
      return response;
    }
  } catch (error) {
    console.log(error.response.data, "error");
    return error;
  }
};
export const putRequest = async (endPoint: string,data:any) => {
  try {
    const url = `${Config.baseUrl2}${endPoint}`;
    const response = await axios.put(url,{...data});
    if (response) {
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const uploadFiless = async (endPoint: string, formData: any) => {
  try {
    const url = `${Config.baseUrl2}${endPoint}`;
    const response = await axios({
      method: "post",
      url: url,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response) {
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const delRequest = async (endPoint) => {
  try {
    const url = `${Config.baseUrl2}${endPoint}`;
    const response = await axios.delete(url);
    if (response) {
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
