import { atom } from "recoil";
import { ICommunity } from "src/type/communityPage";

const initial: ICommunity = {
  communities: [],
  totalPages: 0,
};

export const postList = atom<ICommunity>({
  key: "postList",
  default: initial,
});
