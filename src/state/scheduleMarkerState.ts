import { atom } from "recoil";

export const scheduleMarkerState = atom<boolean>({
  key: "scheduleMarkerState",
  default: true,
});
