import axios from "axios";
import {
  ICommentCreateForm,
  ICommentUpdateForm,
  IGetCommunityParams,
} from "../type/communityPage";
import { getCookie } from "../utils/cookie";

export const getCommunityAPI = async (params?: IGetCommunityParams) => {
  const KEY = "accessToken";
  let token = getCookie(KEY);

  let config = {};

  if (token) {
    config = {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  } else {
    config = {
      params,
    };
  }

  try {
    const response = await axios.get("/api/api/community", config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseErrorCode = error.response?.data.code;
      console.log(responseErrorCode);
    }
  }
  return { communities: [], lastPage: false };
};

export const createComment = async (
  form: ICommentCreateForm,
  memberId: number
) => {
  const KEY = "accessToken";
  const token = getCookie(KEY);

  try {
    const response = await axios.post(
      `/api/api/community/${form.communityId}/comments?memberId=${memberId}`,
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseErrorCode = error.response?.data.code;
      console.log(responseErrorCode);
    }
  }
};

export const updateComment = async (
  commentId: number,
  form: ICommentUpdateForm
) => {
  const KEY = "accessToken";
  const token = getCookie(KEY);

  try {
    const response = await axios.put(`/api/api/comments/${commentId}`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseErrorCode = error.response?.data.code;
      console.log(responseErrorCode);
    }
  }
};

export const deleteComment = async (commentId: number) => {
  const KEY = "accessToken";
  const token = getCookie(KEY);

  try {
    const response = await axios.delete(`/api/api/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseErrorCode = error.response?.data.code;
      console.log(responseErrorCode);
    }
  }
};
