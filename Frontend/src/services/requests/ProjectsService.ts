import axios from "axios";
import { API_ENDPOINTS } from "../../configs/constants";

export const ProjectsService = {
fetchProjects: async () => {
  const { data } = await axios.get(API_ENDPOINTS.GetProjects);
  return data;
}
}

export default ProjectsService

