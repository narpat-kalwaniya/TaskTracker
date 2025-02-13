import axios from "axios";
import { API_ENDPOINTS } from "../../configs/constants";
import { Dayjs } from "dayjs";

export const ProjectsService = {
  fetchProjects: async () => {
    const { data } = await axios.get(API_ENDPOINTS.GetProjects);
    return data?.data?.project_data;
  },
  createProject: async (payload: {
    project_title: string;
    project_description: string;
    project_end_date: Dayjs;
    creator_email: string;
    creator_username: string;
  }) => {
    return axios.post(API_ENDPOINTS.CreateProject, payload);
  },
};

export default ProjectsService;
