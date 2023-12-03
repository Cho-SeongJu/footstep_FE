import { atom } from "recoil";
import { IShareRoom } from "../type/planShareRoom";

const initialValue: IShareRoom = {
  endPoint: "",
  imageUrl: "",
  shareCode: "",
  shareId: 0,
  shareName: "",
  startPoint: "",
  travelEndDate: "",
  travelStartDate: "",
  hostFlag: true,
};

export const searchShareRoomData = atom({
  key: "searchShareRoomData",
  default: initialValue,
});
