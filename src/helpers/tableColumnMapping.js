export const userMapping = {
  id: "Id",
  first_name: "First Name",
  last_name: "Last Name",
  email: "Email",
  dob: "DOB",
  contact_number: "Contact Number",
  status: "Status",
  created_at: "Created At",
  deleted_at: "Deleted At",
};

export const userColumnValueMapping = {
  status: {
    true: "Active",
    false: "Inactive",
  },
};

export const taskCategoryMapping = {
  id: "Id",
  category_name: "Category Name",
  created_at: "Created At",
  updated_at: "Updated At",
  delete_at: "Delete At",
};

export const userProjectMapping = {
  id: "Id",
  user_id: "User Id",
  project_unique_id: "ProjectUniqueId",
  title: "Title",
  description: "Description",
  created_at: "Created At",
  updated_at: "Updated At",
  delete_at: "Delete At",
};

export const projectTaskMapping = {};

export const projectTaskValueMapping = {
  Low: 0,
  Medium: 1,
  High: 2,
};

export const optionsMapping = {
  category_name: "value",
  assignee_name: "value",
};
