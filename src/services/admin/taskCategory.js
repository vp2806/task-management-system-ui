import { deleteRequest, getRequest } from "../../helpers/axiosHelper";

export async function getTaskCategories() {
  try {
    const response = await getRequest("/task-categories");
    if (response.data.response_type !== "error") {
      return response.data.data;
    }
    return response.data.message;
  } catch (error) {
    console.error("Error while fetching task categories", error);
    return error?.response?.data?.message || error.message;
  }
}

export async function deleteTaskCategory(taskCategoryId) {
  try {
    const response = await deleteRequest(
      `/delete-task-category/${taskCategoryId}`
    );
    return response;
  } catch (error) {
    console.error("Error while deleting task category", error);
    return error?.response?.data?.message || error.message;
  }
}
