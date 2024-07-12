import { getRequest } from "../../helpers/axiosHelper";

export async function getUsers() {
  try {
    const users = await getRequest("/get-users");
    return users.data.data;
  } catch (error) {
    console.error("Error while fetching users", error);
    return error;
  }
}
