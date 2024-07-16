import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../helpers/axiosHelper";

export async function getProjectTasks(projectId) {
  try {
    const response = await getRequest(`/get-tasks/${projectId}`);
    if (response.data.response_type !== "error") {
      return response.data.data;
    }
    return response.data.message;
  } catch (error) {
    console.error("Error while fetching project tasks", error);
    return error?.response?.data?.message || error.message;
  }
}

export async function deleteTask(projectTaskId) {
  try {
    const response = await deleteRequest(`/delete-task/${projectTaskId}`);
    return response;
  } catch (error) {
    console.error("Error while deleting project task", error);
    return error?.response?.data?.message || error.message;
  }
}

export async function addProjectTask(data) {
  try {
    const response = await postRequest("/create-task", data);
    return response;
  } catch (error) {
    console.error("Error while adding project task", error);
    return error?.response?.data?.message || error.message;
  }
}

export async function updateProjectTask(data, projectTaskId) {
  try {
    const response = await putRequest(`/update-task/${projectTaskId}`, data);
    return response;
  } catch (error) {
    console.error("Error while updating project task", error);
    return error?.response?.data?.message || error.message;
  }
}

export async function getTaskCategories() {
  try {
    const response = await getRequest("/get-task-categories");
    if (response.data.response_type !== "error") {
      return response.data.data;
    }
    return response.data.message;
  } catch (error) {
    console.error("Error while fetching user task categories", error);
    return error?.response?.data?.message || error.message;
  }
}
