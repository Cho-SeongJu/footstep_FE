import axios from "axios";
import { errorMsg } from "../utils/errorMsgAlert";
import { getCookie } from "../utils/cookie";
import { checkTokenAPI, refreshTokenAPI } from "./tokenAPI";

interface IBodyDate {
  planDate: string;
  destinationCategoryCode: string;
  destinationName: string;
  destinationAddress: string;
  lng: string;
  lat: string;
  seq: number;
}

export const addDestinationAPI = async (
  shareRoomID: number,
  bodyData: IBodyDate
) => {
  const id = Number(shareRoomID);

  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }

  try {
    const response = await axios.post(
      `/api/api/share-room/${id}/destination`,
      bodyData,
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

export const deleteDestinationAPI = async (
  shareRoomID: number,
  destinationId: number
) => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }

  try {
    const response = await axios.delete(
      `/api/api/share-room/${shareRoomID}/destination/${destinationId}`,
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
