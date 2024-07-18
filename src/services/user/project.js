import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../helpers/axiosHelper";

export async function getProjects() {
  try {
    const response = await getRequest("/get-projects");
    if (response.data.response_type !== "error") {
      return response.data.data;
    }
    return response.data.message;
  } catch (error) {
    console.error("Error while fetching projects", error);
    return error?.response?.data?.message || error.message;
  }
}

export async function deleteProject(projectId) {
  try {
    const response = await deleteRequest(`/delete-project/${projectId}`);
    return response;
  } catch (error) {
    console.error("Error while deleting project", error);
    return error?.response?.data?.message || error.message;
  }
}

export async function addProject(data) {
  try {
    const response = await postRequest("/create-project", data);
    return response;
  } catch (error) {
    console.error("Error while adding project", error);
    return error?.response?.data?.message || error.message;
  }
}

export async function updateProject(data, projectId) {
  try {
    const response = await putRequest(`/update-project/${projectId}`, data);
    return response;
  } catch (error) {
    console.error("Error while updating project", error);
    return error?.response?.data?.message || error.message;
  }
}
