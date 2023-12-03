import { atom } from "recoil";

const initial = {
  type: "title",
  sort: "recent",
  keyword: "",
};

export const condition = atom({
  default: initial,
  key: "condition",
});
