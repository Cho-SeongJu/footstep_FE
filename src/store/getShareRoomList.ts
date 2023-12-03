import { atom } from "recoil";
import { IShareRoomList } from "../type/planShareRoom";

const initial: IShareRoomList = {
  totalPages: -1,
  shareRoomDtoList: [],
};

export const getShareRoomList = atom({
  key: "getShareRoomList",
  default: initial,
});
