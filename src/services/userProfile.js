import { getRequest, postRequest, putRequest } from "../helpers/axiosHelper";

export async function getUserProfile() {
  try {
    const response = await getRequest("/user-profile");
    if (response.data.response_type !== "error") {
      return response.data.data;
    }
    return response.data.message;
  } catch (error) {
    console.error("Error while fetching user profile", error);
    return error?.response?.data?.message || error.message;
  }
}

export async function createUserProfile(data) {
  try {
    const response = await postRequest("/register", data);
    return response;
  } catch (error) {
    console.error("Error while creating a user profile", error);
    return error?.response?.data?.message || error.message;
  }
}

export async function updateUserProfile(data) {
  try {
    const response = await putRequest("/update-user", data);
    return response;
  } catch (error) {
    console.error("Error while updating a user profile", error);
    return error?.response?.data?.message || error.message;
  }
}
