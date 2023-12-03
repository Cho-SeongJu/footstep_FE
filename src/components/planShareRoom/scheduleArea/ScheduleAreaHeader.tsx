import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  editShareRoomInfoAPI,
  getShareRoomDetailAPI,
} from "../../../api/shareRoomAPI";
import { ReactComponent as Exit } from "../../../assets/exit.svg";
import useShareRoomForm from "../../../hooks/useShareRoomForm";
import { disabledState } from "../../../state/componentOpenState";
import { shareRoomInfo } from "../../../store/shareRoomInfo";
import { formValidationCheck } from "../../../utils/formValidationCheck";
import Calendar from "../../common/calendar/Calendar";

const ScheduleAreaHeader = () => {
  const { shareRoomID } = useParams<string>();
  const shareRoom = useRecoilValue(shareRoomInfo);
  const setShareRoomInfo = useSetRecoilState(shareRoomInfo);
  const [disabledStatus, setDisabledStatus] = useRecoilState(disabledState);
  const {
    form,
    backUpForm,
    setForm,
    getData,
    setBackForm,
    setScheduleShareRoomInfo,
    onChangeTitleHandler,
    onChangeDateHandler,
    scheduleShareRoomInfo,
  } = useShareRoomForm();
  const [editStatus, setEditStatus] = useState<boolean>(false);
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  const type = "inShareRoom";

  const lookUpAgain = async () => {
    const response = await getShareRoomDetailAPI(Number(shareRoomID));
    setShareRoomInfo(response);
    setForm({
      title: response.shareName,
      startDate: response.travelStartDate,
      endDate: response.travelEndDate,
    });
    setBackForm({
      title: response.shareName,
      startDate: response.travelStartDate,
      endDate: response.travelEndDate,
    });
    setScheduleShareRoomInfo(response);
    setShareRoomInfo(response);
  };

  const onClickHandler = async (type: string) => {
    switch (type) {
      case "cancel":
        setDisabledStatus({
          header: false,
          daySelect: false,
          scheduleList: false,
          buttonSection: false,
          placeSection: false,
          memo: false,
          showScheduleRoute: false,
        });
        setEditStatus(false);
        setForm({ ...backUpForm });
        break;
      case "edit":
        setDisabledStatus({
          header: false,
          daySelect: true,
          scheduleList: true,
          buttonSection: true,
          placeSection: true,
          memo: true,
          showScheduleRoute: true,
        });
        setEditStatus(true);
        break;
      case "complete":
        if (!formValidationCheck(form)) return;
        setDisabledStatus({
          header: false,
          daySelect: false,
          scheduleList: false,
          buttonSection: false,
          placeSection: false,
          memo: false,
          showScheduleRoute: false,
        });

        if (shareRoomID) {
          const result = await editShareRoomInfoAPI(Number(shareRoomID), form);

          if (result === 200) {
            lookUpAgain();
            MySwal.fire({
              icon: "success",
              text: "수정이 성공적으로 되었습니다",
            });
            getData(Number(shareRoomID));
            setEditStatus(false);
          } else {
            MySwal.fire({
              icon: "success",
              text: "처리 중 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.",
            });
          }
        }
    }
  };

  const onClickExitHanlder = () => {
    MySwal.fire({
      title: "정말로 나가시겠습니까?",
      text: "저장하지 않았을 경우 다시 복구할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "나가기",
      cancelButtonText: "취소",
    }).then((result) => {
      result.isConfirmed && navigate("/planShareEntrance");
    });
  };

  const onClickShareCodeHandler = () => {
    MySwal.fire({
      title: "공유 코드",
      text: shareRoom.shareCode,
      icon: "info",
    });
  };

  useEffect(() => {
    if (shareRoomID) {
      getData(Number(shareRoomID));
    }
  }, []);

  return (
    <div
      className={`relative w-planShareRoomSideBar h-[13.5rem] bg-gray-005 ${
        !disabledStatus.header ? "z-[1005]" : "z-[1003]"
      }`}
    >
      <div className="flex justify-between items-center">
        <button
          type="button"
          className="mt-4 mb-6 ml-2"
        >
          <Exit
            className="w-[25px] h-[25px] fill-black-003 hover:fill-red-001"
            onClick={onClickExitHanlder}
          />
        </button>
        <button
          type="button"
          className="text-blue-001 text-sm cursor-pointer"
          onClick={onClickShareCodeHandler}
        >
          공유코드보기
        </button>
        {editStatus ? (
          <div className="flex mr-4 text-sm">
            <p
              className="mx-1 text-green-001 cursor-pointer"
              onClick={() => onClickHandler("complete")}
            >
              수정
            </p>
            <p
              className="mx-1 text-red-001 cursor-pointer"
              onClick={() => onClickHandler("cancel")}
            >
              취소
            </p>
          </div>
        ) : (
          <p
            className="mr-4 text-blue-001 text-sm cursor-pointer"
            onClick={() => onClickHandler("edit")}
          >
            편집
          </p>
        )}
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center w-[17rem]">
          <input
            type="text"
            value={editStatus ? form.title : backUpForm.title}
            className="w-[12rem] bg-gray-007 outline-none text-black font-NanumGothic text-2xl font-[800]"
            onChange={onChangeTitleHandler}
            disabled={editStatus ? false : true}
          />
          {editStatus && (
            <p className="grow ml-4 text-xl text-gray-002">
              {form.title.length} / 20
            </p>
          )}
        </div>
        <Calendar
          type={type}
          editStatus={editStatus}
          onChangeDateHandler={onChangeDateHandler}
          shareRoomInfo={scheduleShareRoomInfo}
        />
      </div>
    </div>
  );
};

export default ScheduleAreaHeader;
