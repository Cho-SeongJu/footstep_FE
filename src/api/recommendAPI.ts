import axios from "axios";
import { IStartPoint } from "../type/startPoint";
import { getCookie } from "../utils/cookie";
import { checkTokenAPI, refreshTokenAPI } from "./tokenAPI";
import { errorMsg } from "../utils/errorMsgAlert";

export const recommendScheduleAPI = async (
  startPoint: IStartPoint,
  shareRoomID: number
) => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }

  try {
    const response = await axios.put(
      `/api/api/share-room/${shareRoomID}/schedule/recommend`,
      startPoint,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorCode = error.response?.data.errorCode;
      errorMsg(errorCode);
    }
  }
};

export const getRecommendPlacesAPI = async (keyword: string) => {
  try {
    const response = await axios.get(
      `/api/api/share-room/recommend?keyword=${keyword}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorCode = error.response?.data.errorCode;
      errorMsg(errorCode);
    }
  }
};
