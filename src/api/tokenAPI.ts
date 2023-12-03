import axios from "axios";
import { getCookie, setCookie } from "../utils/cookie";
import { errorMsg } from "../utils/errorMsgAlert";

export const checkTokenAPI = async (token: string) => {
  try {
    const response = await axios.post(`/api/api/auth/check-token`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorCode = error.response?.data.errorCode;
      errorMsg(errorCode);
    }
  }
};

export const refreshTokenAPI = async () => {
  const COOKIE_KEY = "refresh-token";
  const refreshToken = getCookie(COOKIE_KEY);

  try {
    const response = await axios.post("/api/api/auth/refresh", {
      headers: {
        Cookie: refreshToken,
      },
    });

    if (response.status === 200) {
      const accessToken = response.data;

      setCookie("accessToken", accessToken);
    }
    // 재발급 token
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorCode = error.response?.data.errorCode;
      errorMsg(errorCode);
    }
  }
};
