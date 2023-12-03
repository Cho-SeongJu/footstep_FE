import { atom } from "recoil";
import { ICreateShareRoomFormValue } from "../type/planShareRoom";

export const initialValue: ICreateShareRoomFormValue = {
  title: "",
  startDate: "",
  endDate: "",
};

export const scheduleShareRoomForm = atom<ICreateShareRoomFormValue>({
  key: "createShareRoomFormValue",
  default: initialValue,
});
