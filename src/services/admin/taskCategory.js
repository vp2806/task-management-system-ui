import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../helpers/axiosHelper";

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

export async function addTaskCategory(data) {
  try {
    const response = await postRequest("/create-task-category", data);
    return response;
  } catch (error) {
    console.error("Error while adding task category", error);
    return error?.response?.data?.message || error.message;
  }
}

export async function updateTaskCategory(data, taskCategoryId) {
  try {
    const response = await putRequest(
      `/update-task-category/${taskCategoryId}`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error while updating task category", error);
    return error?.response?.data?.message || error.message;
  }
}
