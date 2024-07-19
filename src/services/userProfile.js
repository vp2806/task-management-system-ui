import { getRequest } from "../helpers/axiosHelper";

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
