import { ChangeEvent, FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import Swal from "sweetalert2";
import { addSchedultMemoAPI } from "../../../api/scheduleAPI";
import { disabledState } from "../../../state/componentOpenState";
import { memberInfo } from "../../../state/memberInfo";
import { schedule } from "../../../store/schedule";

interface IProps {
  setOpenMemo: (openState: boolean) => void;
}

const ScheduleMemo = ({ setOpenMemo }: IProps) => {
  const [textValue, setTextValue] = useState<string>("");
  const [disabledStatus, setDisabledStatus] = useRecoilState(disabledState);
  const [scheduleBytDate, setScheduleByDate] = useRecoilState(schedule);
  const member = useRecoilValue(memberInfo);
  const { shareRoomID } = useParams();

  const onChangeTextValueHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  const editMemoHandler = (e: FormEvent) => {
    e.preventDefault();

    if (scheduleBytDate !== "") {
      const form = {
        content: textValue,
        planDate: scheduleBytDate.planDate,
      };

      if (form.content.length === 0) {
        Swal.fire({
          icon: "error",
          text: "메모를 입력하세요",
        });
        return;
      } else {
        Swal.fire({
          icon: "question",
          text: "일정 메모를 저장하시겠습니까?",
          showCancelButton: true,
          confirmButtonText: "확인",
          cancelButtonText: "취소",
        }).then((result) => {
          if (result.isConfirmed) {
            addSchedultMemoAPI(Number(shareRoomID), member.memberId, form);
            setScheduleByDate({
              ...scheduleBytDate,
              content: textValue,
            });
            setOpenMemo(false);
            setDisabledStatus({
              scheduleList: false,
              header: !disabledStatus.header,
              daySelect: !disabledStatus.daySelect,
              buttonSection: !disabledStatus.buttonSection,
              placeSection: !disabledStatus.placeSection,
              showScheduleRoute: !disabledStatus.showScheduleRoute,
              memo: false,
            });
          }
        });
      }
    }
  };

  const cancelMemoHandler = () => {
    setOpenMemo(false);
    setDisabledStatus({
      scheduleList: false,
      header: !disabledStatus.header,
      daySelect: !disabledStatus.daySelect,
      buttonSection: !disabledStatus.buttonSection,
      placeSection: !disabledStatus.placeSection,
      showScheduleRoute: !disabledStatus.showScheduleRoute,
      memo: false,
    });
  };

  return (
    <>
      <div className="flex justify-center items-center absolute top-12 left-0 w-planShareRoomSideBar h-[14rem] bg-white">
        <form>
          <div className="border border-gray-004 rounded-md">
            <textarea
              className="px-4 py-2 w-[20rem] h-[10rem] outline-none resize-none"
              onChange={onChangeTextValueHandler}
              defaultValue={
                scheduleBytDate !== "" ? scheduleBytDate.content : ""
              }
              maxLength={100}
            />
            <p className="flex flex-row-reverse pr-4 pb-4 text-sm text-gray-001">
              {textValue.length} / 100
            </p>
          </div>
          <div className="flex flex-row-reverse">
            <button
              className="px-1 text-red-001 hover:text-red-003"
              type="button"
              onClick={cancelMemoHandler}
            >
              취소
            </button>
            <button
              className="px-1 text-platinum-001 hover:text-platinum-002"
              type="submit"
              onClick={editMemoHandler}
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ScheduleMemo;
