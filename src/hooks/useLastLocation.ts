import { useSetRecoilState } from "recoil";
import { useLocation } from "react-router-dom";
import { lastLocationState } from "../state/lastLocationState";

export const useLastLocation = () => {
  const setLastLocation = useSetRecoilState(lastLocationState);
  const location = useLocation();

  const saveLastLocation = () => {
    setLastLocation(location.pathname);
    sessionStorage.setItem("lastLocation", location.pathname);
  };

  return saveLastLocation;
};
