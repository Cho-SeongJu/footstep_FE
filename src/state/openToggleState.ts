import { atom } from "recoil";

const initialValue: boolean = false;

export const openToggleState = atom<boolean>({
  key: "toggleState",
  default: initialValue,
});
