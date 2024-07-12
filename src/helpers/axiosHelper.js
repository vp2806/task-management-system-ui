import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function getRequest(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosInstance.get(url);
      return resolve(response);
    } catch (error) {
      console.error("Error while making get request", error);
      return reject(error);
    }
  });
}

export async function postRequest(url, data, config) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosInstance.post(url, data);
      return resolve(response);
    } catch (error) {
      console.error("Error while making post request", error);
      return reject(error);
    }
  });
}

export async function putRequest(url, data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosInstance.put(url, data);
      return resolve(response);
    } catch (error) {
      console.error("Error while making put request", error);
      return reject(error);
    }
  });
}

export async function deleteRequest(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosInstance.delete(url);
      return resolve(response);
    } catch (error) {
      console.error("Error while making delete request", error);
      return reject(error);
    }
  });
}
