import axios from "axios";
import { API_ENDPOINTS } from "../../configs/constants";
import { Dayjs } from "dayjs";

export const ProjectsService = {
  fetchProjects: async () => {
    const { data } = await axios.get(API_ENDPOINTS.GetProjects);
    return data?.data?.project_data;
  },
  createProject: async (payload: {
    project_title: string | undefined;
    project_description: string | undefined;
    project_end_date: Dayjs | null;
    creator_email: string | undefined;
    creator_username: string | undefined;
  }) => {
    return axios.post(API_ENDPOINTS.CreateProject, payload);
  },
  deleteProject: async (project_Id: string): Promise<any> => {
    const { data } = await axios.delete(
      `${API_ENDPOINTS.deleteProject}/${project_Id}`
    );
    return data;
  },
};

export default ProjectsService;
