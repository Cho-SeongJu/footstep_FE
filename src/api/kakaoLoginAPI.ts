import axios from "axios";

export const kakaoLogin = () => {
  window.location.assign(
    `https://kauth.kakao.com/oauth/authorize?client_id=${
      import.meta.env.VITE_KAKAO_API_KEY
    }&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=code`
  );
};

export const sendImage = (shareRoomID: string) => {
  sessionStorage.setItem("shareRoomID", shareRoomID);

  window.location.assign(
    `https://kauth.kakao.com/oauth/authorize?client_id=${
      import.meta.env.VITE_KAKAO_API_KEY
    }&redirect_uri=${
      import.meta.env.VITE_REDIRECT_URI_SEND_IMAGE
    }&response_type=code&scope=talk_message`
  );
};

export const getKakaoToken = async (authorizationCode: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}api/auth/kakao`,
      {
        authorizationCode,
      }
    );

    return response.data;
  } catch (error) {
    console.error(`Failed to get token: ${error}`);
  }
};
