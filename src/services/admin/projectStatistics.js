import { getRequest } from "../../helpers/axiosHelper";

export async function getTaskCategoryData() {
  try {
    const response = await getRequest("/task-category-data");
    if (response.data.response_type !== "error") {
      return response.data.data;
    }
    return response.data.message;
  } catch (error) {
    console.error("Error while fetching task category data", error);
    return error?.response?.data?.message || error.message;
  }
}
