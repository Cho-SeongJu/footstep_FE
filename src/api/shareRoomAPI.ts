import axios from "axios";
import {
  ICreateShareRoomFormValue,
  ISubmitShareRoomData,
} from "../type/shareRoom";
import { getCookie, removeCookie, setCookie } from "../utils/cookie";
import Swal from "sweetalert2";

export const getShareRoomAPI = async (shareCode: string) => {
  const KEY = "accessToken";
  const token = getCookie(KEY);

  try {
    const response = await axios.get(
      `/api/api/share-room/find?q=${shareCode}`,
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
      if (errorCode === "EXPIRED_ACCESS_TOKEN") {
        removeCookie("accessToken");
        refreshTokenAPI();
        getShareRoomAPI(shareCode);
      }
    }
  }
};

export const createShareRoomAPI = async (
  formValue: ICreateShareRoomFormValue
) => {
  const KEY = "accessToken";
  const token = getCookie(KEY);

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
      if (errorCode === "EXPIRED_ACCESS_TOKEN") {
        removeCookie("accessToken");
        refreshTokenAPI();
        createShareRoomAPI(formValue);
      }
    }
  }
};

export const getIncludeShareRoomAPI = async () => {
  const KEY = "accessToken";
  const token = getCookie(KEY);

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
      if (errorCode === "EXPIRED_ACCESS_TOKEN") {
        removeCookie("accessToken");
        refreshTokenAPI();
        getIncludeShareRoomAPI();
      }
    }
  }
};

export const getShareRoomInfoAPI = async (shareRoomID: string) => {
  const id = Number(shareRoomID);

  const KEY = "accessToken";
  const token = getCookie(KEY);

  try {
    const response = await axios.get(`/api/api/share-room/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorCode = error.response?.data.errorCode;
      if (errorCode === "EXPIRED_ACCESS_TOKEN") {
        removeCookie("accessToken");
        refreshTokenAPI();
        getIncludeShareRoomAPI();
      }
    }
  }
};

export const editShareRoomInfoAPI = async (
  shareRoomID: string,
  token: string,
  formValue: ICreateShareRoomFormValue
) => {
  const id = Number(shareRoomID);

  const data: ISubmitShareRoomData = {
    shareName: formValue.title,
    travelStartDate: formValue.startDate,
    travelEndDate: formValue.endDate,
    imageUrl: "",
  };

  const response = await axios.put(`/api/api/share-room/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.status;
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
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const recommendPlacesAPI = async (keyword: string) => {
  const KEY = "accessToken";
  const token = getCookie(KEY);

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
      if (errorCode === "EXPIRED_ACCESS_TOKEN") {
        removeCookie("accessToken");
        refreshTokenAPI();
        getIncludeShareRoomAPI();
      }
    }
  }
};

export const uploadImageAPI = async (formData: FormData) => {
  const boundary = "----WebKitFormBoundary";

  console.log(formData);

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
    console.log(error);
  }
};

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
    Swal.fire({
      icon: "error",
      text: "처리 중 오류가 발생하였습니다.",
    });
  }
};

export const sendTokenEnteringShareRoom = async (shareId: number) => {
  const accessToken = getCookie("accessToken");
  const response = await axios.post(`/api/api/share-room/${shareId}/enter`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
  });
  console.log(response);
  return response.data;
};
