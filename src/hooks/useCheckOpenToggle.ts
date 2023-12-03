import { useRecoilState } from "recoil";
import { openToggleState } from "../state/openToggleState";

export const useCheckOpenToggle = () => {
  const [isOpenToggle, setIsOpenToggle] = useRecoilState(openToggleState);

  const checkOpenToggle = () => {
    if (isOpenToggle) setIsOpenToggle(false);
  };

  return {
    checkOpenToggle,
  };
};
