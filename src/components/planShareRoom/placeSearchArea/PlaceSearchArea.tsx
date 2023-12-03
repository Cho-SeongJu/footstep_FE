import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ReactComponent as LeftArrow } from "../../../assets/leftArrow.svg";
import { sideBarState } from "../../../state/sidebarState";
import { IPropsSideBar } from "../../../type/planShareRoom";
import PlaceSearchAreaContent from "./PlaceSearchAreaContent";
import PlaceSearchAreaHeader from "./PlaceSearchAreaHeader";
import { disabledState } from "../../../state/componentOpenState";

const PlaceSearchArea = ({
  placeSearch,
  panTo,
  placePagination,
}: IPropsSideBar) => {
  const [sideBarOpenState, setSideBarOpenState] = useRecoilState(sideBarState);
  const disabledStatus = useRecoilValue(disabledState);

  const onClickHandler = () => {
    setSideBarOpenState({ ...sideBarOpenState, placeSearch: false });
  };

  useEffect(() => {
    setSideBarOpenState({ ...sideBarOpenState, placeSearch: false });
  }, []);

  return (
    <div
      className={`relative w-[23rem] max-h-100vh shadow-lg bg-gray-007 z-[1002] transition-[left] duration-300 ease-in-out  ${
        sideBarOpenState.placeSearch ? "left-0" : "left-[-50rem]"
      }`}
    >
      <PlaceSearchAreaHeader placeSearch={placeSearch} />
      <PlaceSearchAreaContent
        panTo={panTo}
        placePagination={placePagination}
      />
      <div
        className={`${
          sideBarOpenState.placeSearch ? "block" : "hidden"
        } flex items-center absolute top-[50%] right-[-6.6%] w-6 h-16 bg-white rounded-r-xl cursor-pointer`}
        onClick={onClickHandler}
      >
        <LeftArrow
          className={"fill-[#DCDCDC]"}
          width="20"
          height="20"
        />
      </div>
      <div
        className={`${
          !disabledStatus.placeSection && "hidden"
        } absolute top-0 left-0 w-[23rem] h-[100vh] bg-gray-005 z-[1002] opacity-50`}
      ></div>
    </div>
  );
};

export default PlaceSearchArea;
