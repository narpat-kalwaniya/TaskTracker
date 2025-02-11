import axios from "axios";
import { API_ENDPOINTS } from "../../configs/constants";

export const TasksService = {
fetchTasks: async () => {
  const { data } = await axios.get(API_ENDPOINTS.GetTasks);
  return data;
}
}

export default TasksService