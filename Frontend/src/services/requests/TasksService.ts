import axios from "axios";
import { API_ENDPOINTS } from "../../configs/constants";
import { Dayjs } from "dayjs";

interface UpdateTaskParams {
  task_title: string;
  task_description: string;
  assignee_email: string;
  status: string;
  due_date: Dayjs;
  task_id: number
}

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
  updateTask: async (taskData: UpdateTaskParams) => {
    const response = await axios.put(
      `${API_ENDPOINTS.UpdateTask}$${taskData.task_id}`,
      taskData
    );
    return response.data;
  },
};

export default TasksService;
