import axios from "axios";
import { getCookie } from "../utils/cookie";
import { checkTokenAPI, refreshTokenAPI } from "./tokenAPI";

export const createChatRoom = async (name: string) => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }
  try {
    const response = await axios.post("/api/chat/room", null, {
      params: {
        name: name,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getChatRooms = async () => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }

  try {
    const response = await axios.get("/api/chat/rooms", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    } else {
      console.error("채팅방을 가져오지 못했습니다", response);
    }
  } catch (error) {
    console.error("채팅방을 가져오지 못했습니다", error);
  }
};

export const getChatRoomDetail = async (roomId: string) => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }

  try {
    const response = await axios.get(`/api/chat/room/${roomId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    } else {
      console.error(`채팅방 정보를 가져오지 못했습니다 ${roomId}`, response);
    }
  } catch (error) {
    console.error(`채팅방 정보를 가져오지 못했습니다 ${roomId}`, error);
  }
};

export const getChatRoomEnterMessage = async (shareId: number) => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }

  try {
    const response = await axios.get(`/api/api/share-room/${shareId}/enter`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      console.error(
        `채팅방 입장 정보를 받아오지 못했습니다 ${shareId}`,
        response
      );
    }
  } catch (error) {
    console.error(`채팅방 입장 정보를 받아오지 못했습니다 ${shareId}`, error);
  }
};
