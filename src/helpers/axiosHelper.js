import axios from "axios";

export async function getRequest(url) {
  try {
    return await axios.get(`${process.env.REACT_APP_API_BASE_URL}${url}`);
  } catch (error) {
    console.error("Error while making get request", error);
    throw error;
  }
}

export async function postRequest(url, data) {
  try {
    return new Promise(async (resolve, reject) => {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}${url}`,
        data
      );
      return resolve(response);
    });
  } catch (error) {
    console.error("Error while making post request", error);
    throw error;
  }
}

export async function putRequest(url, data) {
  try {
    return await axios.put(`${process.env.REACT_APP_API_BASE_URL}${url}`, data);
  } catch (error) {
    console.error("Error while making put request", error);
    throw error;
  }
}

export async function deleteRequest(url) {
  try {
    return await axios.delete(`${process.env.REACT_APP_API_BASE_URL}${url}`);
  } catch (error) {
    console.error("Error while making delete request", error);
    throw error;
  }
}
