import { atom } from "recoil";

const initialState = {
  header: false,
  daySelect: false,
  scheduleList: false,
  buttonSection: false,
  placeSection: false,
  showScheduleRoute: false,
  memo: false,
};

export const disabledState = atom({
  key: "disabledState",
  default: initialState,
});
