import { getRequest } from "../../helpers/axiosHelper";

export async function getUserProjects() {
  try {
    const response = await getRequest("/user-projects");
    if (response.data.response_type !== "error") {
      return response.data.data;
    }
    return response.data.message;
  } catch (error) {
    console.error("Error while fetching user projects", error);
    return error?.response?.data?.message || error.message;
  }
}
