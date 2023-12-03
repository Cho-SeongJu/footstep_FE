import axios from "axios";
import { getCookie } from "../utils/cookie";
import { checkTokenAPI, refreshTokenAPI } from "./tokenAPI";
import { getUserInfo } from "../api/profileAPI";

export interface ChangePasswordForm {
  newPassword: string;
  confirmPassword: string;
}

export const changePasswordAPI = async (form: ChangePasswordForm) => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);
  const { memberId } = await getUserInfo(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }

  const response = await axios.post(
    `/api/api/members/password?memberId=${memberId}`,
    {
      password: form.newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
