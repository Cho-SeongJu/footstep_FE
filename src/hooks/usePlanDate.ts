import moment from "moment";
import { useEffect, useState } from "react";
import { IShareRoom } from "../type/planShareRoom";
import { ISelectedDate } from "../type/shareRoomForm";
import { useSetRecoilState } from "recoil";
import { travelDate } from "../state/travelDate";
import Swal from "sweetalert2";
import { Value } from "react-calendar/dist/cjs/shared/types";

interface IClickDate {
  startDate: string;
  endDate: string;
}

const usePlanDate = (
  type: string,
  editStatus: boolean,
  shareRoomInfo: IShareRoom
) => {
  const setTravelDate = useSetRecoilState(travelDate);
  const [night, setNight] = useState<number>(0);
  const [clickCount, setClickCount] = useState<number>(0);
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<ISelectedDate>({
    startDate: new Date(),
    endDate: new Date(),
    printStartDate: "",
    printEndDate: "",
    submitStartDate: "",
    submitEndDate: "",
    init: true,
  });
  const [checkDate, setCheckDate] = useState<IClickDate>({
    startDate: "",
    endDate: "",
  });

  const calculateNights = () => {
    let startDate;
    let endDate;

    if (type === "inShareRoom") {
      if (selectedDate.init) {
        startDate = new Date(shareRoomInfo.travelStartDate);
        endDate = new Date(shareRoomInfo.travelEndDate);
        const printStartDate = moment(shareRoomInfo.travelStartDate).format(
          "MM.DD"
        );
        const printEndDate = moment(shareRoomInfo.travelEndDate).format(
          "MM.DD"
        );
        setSelectedDate({
          ...selectedDate,
          printStartDate,
          printEndDate,
          startDate,
          endDate,
          init: false,
        });
      } else {
        startDate = selectedDate.startDate;
        endDate = selectedDate.endDate;
      }
    } else {
      startDate = selectedDate.startDate;
      endDate = selectedDate.endDate;
    }

    let diff = Math.abs(endDate.getTime() - startDate.getTime());
    diff = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (openCalendar) {
      diff = diff - 1;
    }
    setNight(diff);

    if (!isNaN(diff)) {
      setTravelDate(diff + 1);
    }
  };

  const onChangeHandler = (value: Value) => {
    let startDate: Date;
    let endDate: Date;

    if (Array.isArray(value)) {
      startDate = value[0] as Date;
      endDate = value[1] as Date;
    } else {
      startDate = value as Date;
      endDate = value as Date;
    }

    setSelectedDate({ ...selectedDate, startDate, endDate });
  };

  const onClickCalendarHandler = (date: Date) => {
    if (clickCount === 0) {
      const startDate = moment(date).format("YYYY-MM-DD");
      setCheckDate({ startDate, endDate: "" });
      setClickCount((prev) => prev + 1);
    } else if (clickCount === 1) {
      const endDate = moment(date).format("YYYY-MM-DD");
      setCheckDate({ ...checkDate, endDate });
      setClickCount(0);
    }
  };

  const onClickCompleteButtonHandler = () => {
    if (checkDate.startDate === "") {
      Swal.fire({
        icon: "error",
        text: "여행 시작 일자를 선택해주세요.",
      });
      return;
    } else if (checkDate.endDate === "") {
      Swal.fire({
        icon: "error",
        text: "여행 종료 일자를 선택해주세요.",
      });
      return;
    }

    setCheckDate({ startDate: "", endDate: "" });

    const submitStartDate = moment(selectedDate.startDate).format("YYYY-MM-DD");
    const submitEndDate = moment(selectedDate.endDate).format("YYYY-MM-DD");
    const printStartDate = moment(selectedDate.startDate).format("MM.DD");
    const printEndDate = moment(selectedDate.endDate).format("MM.DD");

    calculateNights();
    setSelectedDate({
      ...selectedDate,
      printStartDate,
      printEndDate,
      submitStartDate,
      submitEndDate,
    });
    setOpenCalendar(false);
  };

  const onClickDateCalendar = () => {
    if (editStatus) {
      setOpenCalendar(!openCalendar);
    }
  };

  const setDateInShareRoom = () => {
    const printStartDate = moment(shareRoomInfo.travelStartDate).format(
      "MM.DD"
    );
    const printEndDate = moment(shareRoomInfo.travelEndDate).format("MM.DD");
    const startDate = new Date(shareRoomInfo.travelStartDate);
    const endDate = new Date(shareRoomInfo.travelEndDate);
    let diff = Math.abs(endDate.getTime() - startDate.getTime());
    diff = Math.ceil(diff / (1000 * 60 * 60 * 24));

    setNight(diff);
    setSelectedDate({ ...selectedDate, printStartDate, printEndDate });
  };

  useEffect(() => {
    calculateNights();
  }, [shareRoomInfo]);

  useEffect(() => {
    if (!editStatus) {
      if (type === "inShareRoom") {
        setDateInShareRoom();
      }
      setOpenCalendar(false);
    }
  }, [editStatus]);

  return {
    night,
    selectedDate,
    openCalendar,
    onChangeHandler,
    onClickCalendarHandler,
    onClickCompleteButtonHandler,
    onClickDateCalendar,
  } as const;
};

export default usePlanDate;
