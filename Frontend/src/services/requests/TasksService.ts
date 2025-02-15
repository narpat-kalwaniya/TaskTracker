import axios from "axios";
import { API_ENDPOINTS } from "../../configs/constants";
import { Dayjs } from "dayjs";

interface UpdateTaskParams {
  task_title: string | undefined;
  task_description: string | undefined;
  assignee_email: string | undefined;
  status: string | undefined;
  due_date: Dayjs | null;
  task_id: number | undefined
}

export const TasksService = {
  fetchTasks: async (project_id: number) => {
    const { data } = await axios.get(API_ENDPOINTS.GetTasks, {
      params: { project_id },
    });
    return data;
  },
  createTask: async (payload: {
    project_id: string | undefined;
    task_title: string | undefined;
    task_description: string | undefined;
    due_date: Dayjs | null;
    assignee_email: string | undefined;
  }) => {
    return axios.post(API_ENDPOINTS.CreateTask, payload);
  },
  updateTask: async (taskData: UpdateTaskParams) => {
    const response = await axios.put(
      `${API_ENDPOINTS.UpdateTask}${taskData.task_id}`,
      taskData
    );
    return response.data;
  },
};

export default TasksService;
