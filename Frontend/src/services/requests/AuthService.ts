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

export const AuthService = {
  fetchUserInfo: async (payload?: { email: string }): Promise<UserInfo> => {
    const { data } = await axios.get( payload ? 
      `${API_ENDPOINTS.UserInfo}?user_email=${payload?.email}` : API_ENDPOINTS.UserInfo
    );
    return data;
  },
};

export default AuthService;
