import axios from "axios";
import Swal from "sweetalert2";
import {
  ICreateShareRoomFormValue,
  ISubmitShareRoomData,
} from "../type/planShareRoom";
import { getCookie } from "../utils/cookie";
import { checkTokenAPI, refreshTokenAPI } from "./tokenAPI";
import { errorMsg } from "../utils/errorMsgAlert";

// 공유코드로 공유방 찾기
export const getShareRoomAPI = async (shareRoomID: string) => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }

  try {
    const response = await axios.get(
      `/api/api/share-room/find?q=${shareRoomID}`,
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

// 공유방 생성
export const createShareRoomAPI = async (
  formValue: ICreateShareRoomFormValue
) => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }

  const data: ISubmitShareRoomData = {
    shareName: formValue.title,
    travelStartDate: formValue.startDate,
    travelEndDate: formValue.endDate,
    imageUrl: "",
  };

  try {
    const response = await axios.post("/api/api/share-room", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorCode = error.response?.data.errorCode;
      errorMsg(errorCode);
    }
  }
};

// 참여중인 공유방 리스트 조회
export const getIncludeShareRoomAPI = async () => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }

  try {
    const response = await axios.get("/api/api/share-room?page=0&size=20", {
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

// 공유방 상세정보 조회
export const getShareRoomDetailAPI = async (shareRoomID: number) => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }
  try {
    const response = await axios.get(`/api/api/share-room/${shareRoomID}`, {
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

// 공유방 정보 수정
export const editShareRoomInfoAPI = async (
  shareRoomID: number,
  formValue: ICreateShareRoomFormValue
) => {
  const data: ISubmitShareRoomData = {
    shareName: formValue.title,
    travelStartDate: formValue.startDate,
    travelEndDate: formValue.endDate,
    imageUrl: "",
  };

  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }

  const response = await axios.put(`/api/api/share-room/${shareRoomID}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.status;
};

// 추천장소 검색
export const recommendPlacesAPI = async (keyword: string) => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }

  try {
    const response = await axios.get(
      `/api/api/share-room/recommend?keyword=${keyword}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorCode = error.response?.data.errorCode;
      errorMsg(errorCode);
    }
  }
};

// 이미지 업로드
export const uploadImageAPI = async (formData: FormData) => {
  const boundary = "----WebKitFormBoundary";

  try {
    const response = await axios.post(
      `/api/api/upload?image&shareRoomId`,
      formData,
      {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${boundary}`,
        },
      }
    );
    console.log(response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorCode = error.response?.data.errorCode;
      errorMsg(errorCode);
    }
  }
};

// 카카오에 이미지 전송
export const sendImageKaKaoAPI = async (
  authorizationCode: string,
  shareRoomID: number
) => {
  try {
    const response = await axios.post(`/api/api/sendme/${shareRoomID}`, {
      authorizationCode,
    });

    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        text: "나에게로 일정 공유를 완료했습니다.",
      });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorCode = error.response?.data.errorCode;
      errorMsg(errorCode);
    }
  }
};

export const sendTokenEnteringShareRoom = async (shareRoomID: number) => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }
  const response = await axios.post(
    `/api/api/share-room/${shareRoomID}/enter`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
