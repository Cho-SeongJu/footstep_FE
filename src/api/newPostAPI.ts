import axios from "axios";
import { IPlanSchedule } from "../type/newPost";
import { getCookie } from "../utils/cookie";
import { getShareRoomDetailAPI } from "./shareRoomAPI";
import { checkTokenAPI, refreshTokenAPI } from "./tokenAPI";

export const getPlanScheduleAPI = async (
  shareId: number
): Promise<IPlanSchedule[]> => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }

  try {
    const roomInfo = await getShareRoomDetailAPI(Number(shareId));
    const startDate = roomInfo.travelStartDate;
    const endDate = roomInfo.travelEndDate;
    const response = await axios.get(
      `/api/api/share-room/${shareId}/schedule?startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
    }
    throw error;
  }
};

export const postCommunityAPI = async (
  memberId: number,
  shareId: number,
  title: string,
  isPublic: boolean,
  content: string
): Promise<any> => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }

  try {
    const response = await axios.post(
      `/api/api/community?memberId=${memberId}`,
      {
        shareId,
        communityName: title,
        communityPublicState: isPublic,
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
    }
    throw error;
  }
};

export const getMemberIdAPI = async (): Promise<number> => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }

  try {
    const response = await axios.get(`/api/api/members/${token}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.memberId;
  } catch (error) {
    if (axios.isAxiosError(error)) {
    }
    throw error;
  }
};
