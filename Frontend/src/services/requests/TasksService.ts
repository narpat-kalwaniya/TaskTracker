import axios from "axios";
import { API_ENDPOINTS } from "../../configs/constants";

export const TasksService = {
  fetchTasks: async (project_id: number) => {
  const { data } = await axios.get(API_ENDPOINTS.GetTasks, {
    params: { project_id },
  });
  return data;
},
  createTask: async (payload: {
    project_id: string;
    task_title: string;
    task_description: string;
    due_date: string;
    assignee: string;
  }) => {
    return axios.post(API_ENDPOINTS.CreateTask, payload);
  },
};

export default TasksService;
