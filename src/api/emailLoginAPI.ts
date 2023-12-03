import axios from "axios";
import { TLoginFormData } from "../type/emailLogin";
import { errorMsg } from "../utils/errorMsgAlert";

export const signInWithEmail = async (data: TLoginFormData): Promise<any> => {
  try {
    const response = await axios.post("/api/api/members/sign-in", {
      loginEmail: data.email,
      password: data.password,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorCode = error.response?.data.errorCode;
      errorMsg(errorCode);
    }
  }
};
