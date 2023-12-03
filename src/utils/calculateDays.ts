import { IShareRoom } from "../type/planShareRoom";

interface IPlanDates {
  month: number;
  date: number;
  day: string;
  planDay: number;
  planDate: string;
}

const setDay = (startDay: number, index: number) => {
  const newDay = (startDay + index) % 7;

  let day = "";

  switch (newDay) {
    case 0:
      day = "일";
      break;
    case 1:
      day = "월";
      break;
    case 2:
      day = "화";
      break;
    case 3:
      day = "수";
      break;
    case 4:
      day = "목";
      break;
    case 5:
      day = "금";
      break;
    case 6:
      day = "토";
      break;
  }

  return day;
};

export const calculateDays = (getShareRoomInfo: IShareRoom) => {
  let selectedDate = {
    month: 1,
    date: 1,
    day: "",
    planDay: 1,
    planDate: "",
  };

  let planDates = [];

  const newStartDate = new Date(getShareRoomInfo.travelStartDate);
  const newEndDate = new Date(getShareRoomInfo.travelEndDate);

  let year = newStartDate.getFullYear();
  let month = newStartDate.getMonth();
  let date = newStartDate.getDate();
  const day = newStartDate.getDay();
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  let diff = Math.abs(newStartDate.getTime() - newEndDate.getTime());
  diff = Math.ceil(diff / (1000 * 60 * 60 * 24));
  let newDate = date;

  for (let i = 0; i <= diff; i++) {
    const newDay = setDay(day, i);

    if (month % 2 !== 0 && month !== 7 && newDate >= 31) {
      newDate = 1;
      month = month + 1;
    } else if (month % 2 !== 0 && month === 7 && newDate >= 32) {
      newDate = 1;
      month = month + 1;
    } else if (month % 2 === 0 && newDate >= 32) {
      newDate = 1;
      month = month + 1;
    } else if (isLeapYear && month === 1 && newDate >= 30) {
      newDate = 1;
      month = month + 1;
    } else if (!isLeapYear && month === 1 && newDate >= 29) {
      newDate = 1;
      month = month + 1;
    }

    if (month === 12) {
      year = year + 1;
      month = 0;
    }

    const newMonth = String(month).length === 1 ? `0${month + 1}` : month + 1;

    const dateInfo: IPlanDates = {
      month: month + 1,
      date: newDate,
      day: newDay,
      planDay: i + 1,
      planDate: `${year}-${newMonth}-${newDate <= 9 ? "0" + newDate : newDate}`,
    };

    if (i === 0) {
      selectedDate = dateInfo;
    }

    planDates.push(dateInfo);
    newDate++;
  }

  return { selectedDate, planDates };
};
