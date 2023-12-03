import axios from "axios";
import { getCookie } from "../utils/cookie";
import { checkTokenAPI, refreshTokenAPI } from "./tokenAPI";

export const getMemberByAccessToken = async (): Promise<any> => {
  let token = getCookie("accessToken");
  if (!token) {
    return null;
  }
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }

  const config = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : undefined;

  try {
    const response = await axios.get(`/api/api/members/${token}`, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
    throw error;
  }
};

export const getCurrentUserNickname = async (): Promise<string | null> => {
  const memberData = await getMemberByAccessToken();

  if (!memberData) {
    return null;
  }

  return memberData.nickname;
};

export const getCurrentUserMemberId = async (): Promise<number | undefined> => {
  const memberData = await getMemberByAccessToken();

  if (!memberData) {
    return undefined;
  }

  return memberData.memberId;
};
