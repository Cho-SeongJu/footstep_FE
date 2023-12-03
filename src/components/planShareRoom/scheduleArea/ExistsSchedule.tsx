import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Swal from "sweetalert2";
import { ReactComponent as Close } from "../../../assets/close.svg";
import { ReactComponent as Flag } from "../../../assets/flag.svg";
import useSchdule from "../../../hooks/useSchdule";
import { disabledState } from "../../../state/componentOpenState";
import { scheduleMarkerState } from "../../../state/scheduleMarkerState";
import { selecteStartPoint } from "../../../state/selectStartPoint";
import { sideBarState } from "../../../state/sidebarState";
import { scheduleList } from "../../../store/scheduleList";
import { selectedDay } from "../../../store/selectedDay";
import ScheduleMemo from "./ScheduleMemo";

interface IDestination {
  destinationId: number;
  destinationAddress: string;
  destinationCategoryCode: string;
  destinationName: string;
  lat: number;
  lng: number;
  seq: number;
}

const ExistsSchedule = () => {
  const selectedDate = useRecoilValue(selectedDay);
  const schedules = useRecoilValue(scheduleList);
  const setStartPoint = useSetRecoilState(selecteStartPoint);
  const [openScheduleMarkerState, setOpenScheduleMarkerState] =
    useRecoilState(scheduleMarkerState);
  const [disabledStatus, setDisabledStatus] = useRecoilState(disabledState);
  const [sideBarOpenState, setSidebarOpenState] = useRecoilState(sideBarState);
  const { deleteDestination } = useSchdule();
  const [selectStartPoint, setSelecteStartPoint] = useState(false);
  const [openMemo, setOpenMemo] = useState<boolean>(false);

  const onClickSelectStartPointHandler = () => {
    setDisabledStatus({
      scheduleList: false,
      header: !disabledStatus.header,
      daySelect: !disabledStatus.daySelect,
      buttonSection: !disabledStatus.buttonSection,
      placeSection: !disabledStatus.placeSection,
      memo: !disabledStatus.memo,
      showScheduleRoute: !disabledStatus.showScheduleRoute,
    });
    setSelecteStartPoint(!selectStartPoint);
  };

  const onClickMemoHandler = () => {
    setOpenMemo(!openMemo);
    setDisabledStatus({
      memo: false,
      header: !disabledStatus.header,
      daySelect: !disabledStatus.daySelect,
      scheduleList: !disabledStatus.scheduleList,
      buttonSection: !disabledStatus.buttonSection,
      placeSection: !disabledStatus.placeSection,
      showScheduleRoute: !disabledStatus.showScheduleRoute,
    });
  };

  const onClickSelectHandler = (destination: IDestination) => {
    Swal.fire({
      icon: "question",
      text: "해당 목적지를 출발지로 선택하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        setDisabledStatus({
          scheduleList: false,
          header: !disabledStatus.header,
          daySelect: !disabledStatus.daySelect,
          buttonSection: !disabledStatus.buttonSection,
          placeSection: !disabledStatus.placeSection,
          memo: !disabledStatus.memo,
          showScheduleRoute: !disabledStatus.showScheduleRoute,
        });

        setStartPoint({
          lng: destination.lng,
          lat: destination.lat,
          planDate: selectedDate.planDate,
        });
        setSelecteStartPoint(false);
      }
    });
  };

  const onClickaddPlaceHandler = () => {
    if (!sideBarOpenState.placeSearch) {
      setSidebarOpenState({ ...sideBarOpenState, placeSearch: true });
    }
  };

  const onClickDeletePlaceHandler = (destinationId: number) => {
    deleteDestination(destinationId);
  };

  const onClickScheduleMarkerHandler = () => {
    setOpenScheduleMarkerState(!openScheduleMarkerState);
  };

  return (
    <div className="relative shadow-md bg-gray-005">
      <div
        className={`flex justify-between relative pt-4 pb-3 pl-4 ${
          !disabledStatus.scheduleList ? "z-[1005]" : "z-[1003]"
        }`}
      >
        <button
          className="flex items-center px-3 py-2 bg-blue-001 hover:bg-blue-003 rounded-full font-bold text-[0.8rem] text-white"
          onClick={onClickSelectStartPointHandler}
          type="button"
        >
          <Flag className="mr-1 w-[16px] h-[16px] fill-white" />
          {!selectStartPoint ? "출발지 선택" : "출발지 선택 해제"}
        </button>
        <button
          type="button"
          className="mr-4 px-3 py-2 bg-orange-001 hover:bg-orange-003 disabled:bg-gray-002 rounded-full font-bold text-sm text-white cursor-pointer"
          onClick={onClickaddPlaceHandler}
          disabled={selectStartPoint ? true : false}
        >
          장소추가
        </button>
      </div>
      <div>
        <div
          className={`relative pl-4 pb-4 ${
            !disabledStatus.memo ? "z-[1005]" : "z-[1003]"
          }`}
        >
          <button
            className="mr-4 px-3 py-2 bg-green-001 hover:bg-green-003 disabled:bg-gray-002 rounded-full font-bold text-sm text-white cursor-pointer"
            onClick={onClickMemoHandler}
            disabled={selectStartPoint ? true : false}
          >
            일정메모
          </button>
          {openMemo && <ScheduleMemo setOpenMemo={setOpenMemo} />}
        </div>
        <div
          className={`relative flex items-center ${
            disabledStatus.showScheduleRoute ? "z-[1003]" : "z-[1005]"
          }`}
        >
          <input
            id="scheduleMarker"
            type="checkbox"
            className="ml-4"
            onClick={onClickScheduleMarkerHandler}
            defaultChecked={openScheduleMarkerState}
          />
          <label
            htmlFor="scheduleMarker"
            className="ml-1 text-md"
          >
            일정위치보기
          </label>
          <p className="ml-2 pt-0.5 text-[0.7rem] text-gray-001">
            해당 선택 시 검색 장소를 볼 수 없습니다.
          </p>
        </div>
      </div>
      <div
        className={`flex flex-col items-center relative h-[27rem] overflow-y-auto ${
          !disabledStatus.scheduleList ? "z-[1005]" : "z-[1003]"
        }`}
      >
        {schedules[selectedDate.planDay - 1].destinationDtoList.length !== 0 &&
          schedules[selectedDate.planDay - 1].destinationDtoList.map(
            (destination: any) => (
              <div
                key={destination.destinationId}
                className="flex items-center"
              >
                {selectStartPoint && (
                  <button
                    className="mt-4 mr-2 text-sm text-black-003 hover:text-blue-001 cursor-pointer"
                    onClick={() => onClickSelectHandler(destination)}
                    type="button"
                  >
                    선택
                  </button>
                )}
                <div
                  key={destination.destinationId}
                  className="relative mt-4 px-3 py-4 w-[17rem] bg-white border border-gray-003 rounded-md shadow-md"
                >
                  <p className="text-[1.2rem] font-[500]">
                    {destination.destinationName}
                  </p>
                  <p className="mt-1 text-[0.8rem] font-light">
                    {destination.destinationAddress}
                  </p>
                  <div>
                    {!selectStartPoint && (
                      <button
                        type="button"
                        className="absolute top-3 right-3 w-[10px] h-[10px]"
                        onClick={() =>
                          onClickDeletePlaceHandler(destination.destinationId)
                        }
                      >
                        <Close className="w-[10px] h-[10px] fill-red-001" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default ExistsSchedule;
