import { deleteRequest, getRequest } from "../../helpers/axiosHelper";

export async function getUsers() {
  try {
    const response = await getRequest("/get-users");
    if (response.data.response_type !== "error") {
      return response.data.data;
    }
    return response.data.message;
  } catch (error) {
    console.error("Error while fetching users", error);
    return error?.response?.data?.message || error.message;
  }
}

export async function deleteUser(userId) {
  try {
    const response = await deleteRequest(`/delete-user/${userId}`);
    return response;
  } catch (error) {
    console.error("Error while deleting user", error);
    return error?.response?.data?.message || error.message;
  }
}
