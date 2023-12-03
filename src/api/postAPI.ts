import axios from "axios";
import { ICommunityPost } from "../type/communityPage";
import { getCookie } from "../utils/cookie";
import { getMemberIdAPI } from "./newPostAPI";
import { checkTokenAPI, refreshTokenAPI } from "./tokenAPI";

export const getPostAPI = async (
  communityId: number
): Promise<ICommunityPost> => {
  let token = getCookie("accessToken");
  let config = {};

  if (token) {
    const isAvailableToken = await checkTokenAPI(token);

    if (!isAvailableToken.isValid) {
      token = await refreshTokenAPI();
    }

    config = { headers: { Authorization: `Bearer ${token}` } };
  }

  try {
    const response = await axios.get(
      `/api/api/community/${communityId}`,
      config
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseErrorCode = error.response?.data.code;
      console.log(responseErrorCode);
    }
    throw error;
  }
};

export const likePostAPI = async (communityId: number): Promise<void> => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }

  const memberId = await getMemberIdAPI();

  try {
    await axios.post(
      `/api/api/community/${communityId}/like?memberId=${memberId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseErrorCode = error.response?.data.code;
      console.log(responseErrorCode);
    }
    throw error;
  }
};

export const unlikePostAPI = async (communityId: number): Promise<void> => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }

  const memberId = await getMemberIdAPI();

  try {
    await axios.post(
      `/api/api/community/${communityId}/un-like?memberId=${memberId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
    throw error;
  }
};

export const updatePostAPI = async (
  communityId: number,
  communityName: string,
  content: string
): Promise<void> => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);
  console.log(communityName);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }

  const memberId = await getMemberIdAPI();

  try {
    await axios.put(
      `/api/api/community/${communityId}?memberId=${memberId}`,
      { communityName, content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseErrorCode = error.response?.data.code;
      console.log(responseErrorCode);
    }
    throw error;
  }
};

export const deletePostAPI = async (communityId: number): Promise<void> => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }

  const memberId = await getMemberIdAPI();

  try {
    await axios.delete(
      `/api/api/community/${communityId}?memberId=${memberId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseErrorCode = error.response?.data.code;
      console.log(responseErrorCode);
    }
    throw error;
  }
};
