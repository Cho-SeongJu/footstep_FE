import moment from "moment";
import RCalendar from "react-calendar";
import { ReactComponent as CalendarIcon } from "../../../assets/blackCalendar.svg";
import { ReactComponent as BottomArrow } from "../../../assets/bottomArrow.svg";
import usePlanDate from "../../../hooks/usePlanDate";
import { useEffect } from "react";
import { ISelectedDate } from "../../../type/shareRoomForm";
import { IShareRoom } from "../../../type/planShareRoom";

interface IProps {
  type: string;
  editStatus: boolean;
  onChangeDateHandler: (selectedDate: ISelectedDate) => void;
  shareRoomInfo: IShareRoom;
}

const Calendar = ({
  type,
  editStatus = true,
  onChangeDateHandler,
  shareRoomInfo,
}: IProps) => {
  const {
    night,
    selectedDate,
    openCalendar,
    onChangeHandler,
    onClickCalendarHandler,
    onClickCompleteButtonHandler,
    onClickDateCalendar,
  } = usePlanDate(type, editStatus, shareRoomInfo);
  const isSelected = selectedDate.printStartDate !== "";

  useEffect(() => {
    onChangeDateHandler(selectedDate);
  }, [selectedDate]);

  return (
    <div className="relative z-[1003]">
      <div
        className={`flex items-center mt-6 sm:w-[19rem] w-full h-[3.5rem] ${
          editStatus ? "bg-white" : "bg-gray-006"
        } border border-gray-006 rounded-sm shadow-sm`}
        onClick={onClickDateCalendar}
        role="presentation"
      >
        <CalendarIcon className="mx-4 w-[28px] h-[28px]" />
        <div className="grow flex justify-center mx-4 font-normal text-gray-002 sm:text-base text-[0.63rem]">
          <p className="grow">
            {isSelected
              ? `${selectedDate.printStartDate} ~ ${selectedDate.printEndDate}`
              : "일자를 선택해주세요."}
          </p>
          {night !== 0 && <p>{`${night}박`}</p>}
        </div>
        <BottomArrow className="mx-4 w-[25px] h-[25px]" />
      </div>
      {openCalendar && (
        <div className="absolute top-[5.5rem]">
          <RCalendar
            onChange={onChangeHandler}
            onClickDay={onClickCalendarHandler}
            calendarType="US"
            selectRange
            returnValue="range"
            formatDay={(_locale, date) => moment(date).format("D")}
          />
          <div className="flex justify-center items-center w-[350px] h-[4rem] border-x border-b border-gray-002 rounded-b-md bg-white box-border">
            <button
              type="button"
              className="w-[13rem] h-[2.8rem] bg-blue-002 rounded-md text-[1.4rem] text-white"
              onClick={onClickCompleteButtonHandler}
            >
              선택완료
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
