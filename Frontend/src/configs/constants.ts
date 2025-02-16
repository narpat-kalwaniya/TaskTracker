export const API_ENDPOINTS = {
  CreateProject: "https://fsd-case-study.onrender.com/api/create_project/",
  CreateTask: "https://fsd-case-study.onrender.com/api/create_tasks/",
  GetProjects: "https://fsd-case-study.onrender.com/api/get_projects",
  GetTasks: "https://fsd-case-study.onrender.com/api/get_task",
  UpdateTask: "https://fsd-case-study.onrender.com/api/update_task/",
  UserInfo: "https://fsd-case-study.onrender.com/api/get_user_list",
  AddUser: "https://fsd-case-study.onrender.com/api/add_user",
};

export const TASK_STATUS_OPTIONS = [
  { label: "New", value: "New" },
  { label: "In Progress", value: "In Progress" },
  { label: "Done", value: "Done" },
  { label: "Cancelled", value: "Cancelled" },
];
export const ROLE_OPTIONS = [
  { label: "Admin", value: "admin" },
  { label: "Contributor", value: "contributor" },
  { label: "Viewer", value: "viewer" },
];

export const STATUS_COLORS: Record<string, string> = {
  Done: "#66BB6E",
  New: "black",
  "In Progress": "#F59C34",
  Cancelled: "#DA5776",
};

export const TASK_COLUMNS = [
  { id: "task_title", label: "Title" },
  { id: "task_description", label: "Description" },
  { id: "due_date", label: "Due Date" },
  { id: "task_owner", label: "Owner" },
  { id: "assignee_email", label: "Assignee" },
  { id: "status", label: "Status" },
];

export const USERS_COLUMN = [
  { id: "user_name", label: "User Name" },
  { id: "user_email", label: "Email" },
  { id: "role", label: "Role" },
  { id: "access", label: "Access" },
];

export const PROJECT_COLUMNS = [
  { id: "project_id", label: "Project ID" },
  { id: "project_name", label: "Project Name" },
  { id: "description", label: "Description" },
  { id: "start_date", label: "Start Date" },
  { id: "end_date", label: "End Date" },
  { id: "project_owner", label: "Owner" },
];

export const error_messages = {
  access_denied_text: "Access Denied !",
  access_denied_des:
    "You do not have the required permissions to view this page. Please contact your administrator for access.",
  unauthorised_text: "Unauthorized Access",
  unauthorised_des:
    "You do not have the necessary permissions to access this application. Please contact your administrator for assistance.",
};
