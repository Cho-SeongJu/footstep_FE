import axios from "axios";
import { getCookie } from "../utils/cookie";
import { checkTokenAPI, refreshTokenAPI } from "./tokenAPI";

export const getUserInfo = async (accessToken: string) => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }
  const response = await axios.get(`/api/api/members/${accessToken}`);
  return response.data;
};

export const getProfile = async (memberId: number) => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }

  const response = await axios.get(`/api/api/members/profile`, {
    params: {
      memberId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateMemberProfile = async (formData: any) => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }

  const response = await axios.put(`/api/api/members`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const checkNicknameDuplication = async (nickname: string) => {
  try {
    const response = await axios.post(
      `/api/api/members/check-nickname?nickname=${nickname}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteMember = async (memberId: number) => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }

  const response = await axios.delete(`/api/api/members`, {
    params: {
      memberId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
