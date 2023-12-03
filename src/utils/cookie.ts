import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const getCookie = (key: string) => {
  const token = cookies.get(key);

  return token;
};

export const setCookie = (key: string, token: string) => {
  const option = {
    path: "/",
    maxAge: 60 * 60 * 1,
    sameSite: "none" as const,
    secure: true,
  };

  cookies.set(key, token, option);
};

export const redefineCookie = () => {
  const token = getCookie("accessToken");

  if (!token) return;

  setCookie("accessToken", token);
};

export const removeCookie = (key: string) => {
  cookies.remove(key);
};
