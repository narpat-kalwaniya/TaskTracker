import axios from "axios";
import { API_ENDPOINTS } from "../../configs/constants";

export interface UserInfo {
  status: number;
  message: string;
  data: {
    app_access: boolean;
    data: {
      user_email: string;
      user_name: string;
      role: string;
    }[];
  };
}

export const ManageAccessService = {
  AddNewUser: async (payload?: {
    user_name: string;
    user_email: string;
    role: string;
  }): Promise<{
    status: number;
    data: {
      task_id: string;
      message: string;
    };
  }> => {
    const { data } = await axios.post(API_ENDPOINTS.AddUser, payload);
    return data;
  },
};

export default ManageAccessService;
