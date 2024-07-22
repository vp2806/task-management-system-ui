import { postRequest } from "../../helpers/axiosHelper";

export async function addTaskAssignee(data) {
  try {
    const response = await postRequest("/create-task-assignee", data);
    return response;
  } catch (error) {
    console.error("Error while adding task assignee", error);
    return error?.response?.data?.message || error.message;
  }
}
