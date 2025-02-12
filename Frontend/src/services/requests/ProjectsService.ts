import axios from "axios";
import { API_ENDPOINTS } from "../../configs/constants";

export const ProjectsService = {
  fetchProjects: async () => {
    const { data } = await axios.get(API_ENDPOINTS.GetProjects);
    return data;
  },
  createProject: async (payload: {
    project_title: string;
    project_description: string;
    end_date: string;
  }) => {
    return axios.post(API_ENDPOINTS.CreateProject, payload);
  },
};

export default ProjectsService;
