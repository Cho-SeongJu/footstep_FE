import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Swal from "sweetalert2";
import { sendImage } from "../../../api/kakaoLoginAPI";
import {
  completeScheduleAPI,
  getScheduleAPI,
  getScheduleByDateAPI,
} from "../../../api/scheduleAPI";
import { uploadImageAPI } from "../../../api/shareRoomAPI";
import { ReactComponent as Recommend } from "../../../assets/arrowDirection.svg";
import useSchedule from "../../../hooks/useSchdule";
import { disabledState } from "../../../state/componentOpenState";
import {
  initialValue,
  selecteStartPoint,
} from "../../../state/selectStartPoint";
import { travelDate } from "../../../state/travelDate";
import { ISchedule, schedule } from "../../../store/schedule";
import { scheduleList } from "../../../store/scheduleList";
import { selectedDay } from "../../../store/selectedDay";
import { shareRoomInfo } from "../../../store/shareRoomInfo";
import { IPlanSchedule } from "../../../type/newPost";
import ExistsSchedule from "./ExistsSchedule";
import NotExistsSchedule from "./NotExistsSchedule";

const ScheduleLists = () => {
  const { shareRoomID } = useParams();
  const travelDates = useRecoilValue(travelDate);
  const setScheduleInfo = useSetRecoilState(schedule);
  const disabledStatus = useRecoilValue(disabledState);
  const selectedPlanDay = useRecoilValue(selectedDay);
  const shareRoom = useRecoilValue(shareRoomInfo);
  const schedules = useRecoilValue(scheduleList);
  const [scheduleAfterComplete, setScheduleAfterComplete] = useState<
    IPlanSchedule[]
  >([]);
  const [selectedStartPoint, setSelectedStartPoint] =
    useRecoilState(selecteStartPoint);
  const { recommendRoute, completeRoute } = useSchedule();
  const imageElement = useRef<HTMLDivElement>(null);

  const isExists =
    schedules[selectedPlanDay.planDay - 1] !== undefined &&
    schedules[selectedPlanDay.planDay - 1].destinationDtoList.length !== 0;

  const validation = async (type: string) => {
    if (type === "complete") {
      const response = await getScheduleAPI(Number(shareRoomID));
      const data = response?.data;

      if (data !== undefined) {
        if (travelDates !== data.length) {
          return false;
        }

        data.forEach((destination: ISchedule) => {
          if (destination.destinationDtoList.length === 0) {
            return false;
          }
        });
      }
    } else if (type === "recommend") {
      if (
        selectedStartPoint.planDate === "" &&
        selectedStartPoint.lat === 0 &&
        selectedStartPoint.lng === 0
      ) {
        return false;
      }
    }

    return true;
  };

  const onClickRecommendHandler = async () => {
    const result = await validation("recommend");

    !result
      ? Swal.fire({
          icon: "error",
          text: "출발지를 선택해야 합니다.",
        })
      : Swal.fire({
          icon: "question",
          title: `${selectedPlanDay.planDay}일차`,
          text: `경로를 추천경로로 일정 순서를 변경하시겠습니까?`,
          showCancelButton: true,
          confirmButtonText: "확인",
          cancelButtonText: "취소",
        }).then((result) => {
          if (result.isConfirmed) {
            recommendRoute();
          }
        });
  };

  const convertToImage = async () => {
    if (imageElement.current !== null) {
      const canvas = await html2canvas(imageElement.current);
      const img = canvas.toDataURL();
      return img;
    }
  };

  const urlToFile = async (
    imgUrl: string,
    fileName: string,
    mimeType: string
  ) => {
    let response = await fetch(imgUrl);

    let blob = await response.blob();

    return new File([blob], fileName, { type: mimeType });
  };

  const completeSchedule = async () => {
    const response = await completeScheduleAPI(Number(shareRoomID));

    if (response?.status === 200) {
      const response = await getScheduleAPI(Number(shareRoomID));
      setScheduleAfterComplete(response?.data);

      setTimeout(async () => {
        const imgUrl = (await convertToImage()) as string;

        const file = await urlToFile(imgUrl, "image.png", "image/png");
        const formData = new FormData();
        formData.append("file", file);
        if (shareRoomID) {
          formData.append("shareRoomId", shareRoomID);
        }

        await uploadImageAPI(formData);
        completeRoute();

        Swal.fire({
          imageUrl: imgUrl,
          imageAlt: "custom Image",
          text: "일정을 공유하시겠습니까?",
          showCancelButton: true,
          confirmButtonText: "확인",
          cancelButtonText: "취소",
        }).then((result) => {
          if (result.isConfirmed) {
            if (shareRoomID) {
              sendImage(shareRoomID);
            }
          }
        });
      }, 500);
    }
  };

  const onClickCompleteHandler = async () => {
    const result = await validation("complete");

    !result
      ? Swal.fire({
          icon: "error",
          text: "모든 일차에 장소를 등록해야 일정 완료가 가능합니다.",
        })
      : await Swal.fire({
          icon: "question",
          text: "일정완료를 하시겠습니까?",
          showCancelButton: true,
          confirmButtonText: "확인",
          cancelButtonText: "취소",
        }).then((result) => {
          if (result.isConfirmed) {
            completeSchedule();
          }
        });
  };

  const getScheduleByDate = async () => {
    const initialPlanDate = shareRoom.travelStartDate;
    const response = await getScheduleByDateAPI(
      Number(shareRoomID),
      initialPlanDate
    );
    setScheduleInfo(response?.data);
  };

  useEffect(() => {
    setSelectedStartPoint(initialValue);
  }, []);

  useEffect(() => {
    const initialPlanDate = shareRoom.travelStartDate;
    if (initialPlanDate !== "") {
      getScheduleByDate();
    }
  }, [shareRoom]);

  return (
    <div className="relative">
      <div>
        {isExists ? <ExistsSchedule /> : <NotExistsSchedule />}
        <div
          className={`flex flex-col justify-center items-center relative pt-8 bg-gray-005 ${
            !disabledStatus.buttonSection ? "z-[1005]" : "z-[1003]"
          }`}
        >
          <button
            type="button"
            onClick={onClickRecommendHandler}
            className="flex justify-center items-center w-[17rem] h-[3rem] bg-yellow-001 hover:bg-yellow-003 rounded-sm font-DoHyeon text-xl text-white font-normal"
          >
            <Recommend className="mr-2 w-[20px] h-[20px] fill-white" />
            추천경로 일정설정
          </button>
          <button
            type="button"
            onClick={onClickCompleteHandler}
            className="mt-2 w-[17rem] h-[3rem] bg-platinum-001 hover:bg-platinum-002 rounded-sm font-DoHyeon text-xl text-white font-normal"
          >
            일정완료
          </button>
        </div>
      </div>
      <div
        ref={imageElement}
        style={{
          position: "absolute",
          top: "-50rem",
          padding: "1rem 2rem",
          border: "1px solid #DCDCDC",
          borderRadius: "1.2rem",
        }}
      >
        {scheduleAfterComplete.map((schedule, index) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h1
              style={{
                marginLeft: "0.5rem",
                marginBottom: "1.2rem",
                color: "#000000",
                fontSize: "1.1rem",
                fontWeight: 600,
              }}
            >
              <span style={{ marginRight: "0.8rem" }}>{index + 1}일차</span>
              {schedule.planDate}
            </h1>
            <div style={{ marginBottom: "1rem" }}>
              {schedule.destinationDtoList.map((destination, index) => (
                <div style={{ display: "flex", marginBottom: "0.3rem" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: "0.1rem",
                        width: "2.5rem",
                        height: "2.5rem",
                        backgroundColor: "#5FCDFF",
                        borderRadius: "100%",
                        color: "#FFFFFF",
                        fontWeight: "600",
                      }}
                    >
                      {index + 1}
                    </p>
                    <div
                      style={{
                        marginLeft: "0.4rem",
                        width: "0.5rem",
                        height: "1.8rem",
                        borderRight: "3px solid #5FCDFF",
                      }}
                    ></div>
                  </div>
                  <div style={{ marginLeft: "1rem" }}>
                    <p style={{ fontSize: "1rem", fontWeight: "600" }}>
                      {destination.destinationName}
                    </p>
                    <p style={{ fontSize: "0.8rem", color: "#969696" }}>
                      {destination.destinationAddress}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleLists;
