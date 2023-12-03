import { useRecoilValue } from "recoil";
import { sideBarState } from "../../state/sidebarState";
import SideBarToggle from "./SideBarToggle";
import PlaceSearchArea from "./placeSearchArea/PlaceSearchArea";
import ScheduleArea from "./scheduleArea/ScheduleArea";
import { IPropsSideBar } from "../../type/planShareRoom";

const SideBar = ({ placeSearch, panTo, placePagination }: IPropsSideBar) => {
  const sideBarOpenState = useRecoilValue(sideBarState);

  return (
    <div className="flex absolute min-h-screen">
      {!sideBarOpenState.schedule && <SideBarToggle />}
      <ScheduleArea />
      <PlaceSearchArea
        placeSearch={placeSearch}
        panTo={panTo}
        placePagination={placePagination}
      />
    </div>
  );
};

export default SideBar;
