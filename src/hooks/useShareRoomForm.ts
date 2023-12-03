import { ChangeEvent, useState } from "react";
import { getShareRoomDetailAPI } from "../api/shareRoomAPI";
import { INITIAL_FORM, INITIAL_SHARE_ROOM_INFO } from "../constants/initial";
import { IShareRoom } from "../type/planShareRoom";
import { IForm, ISelectedDate } from "../type/shareRoomForm";
import { useSetRecoilState } from "recoil";
import { shareRoomInfo } from "../store/shareRoomInfo";

const useShareRoomForm = () => {
  const [form, setForm] = useState<IForm>(INITIAL_FORM);
  const [backUpForm, setBackForm] = useState<IForm>(INITIAL_FORM);
  const [scheduleShareRoomInfo, setScheduleShareRoomInfo] =
    useState<IShareRoom>(INITIAL_SHARE_ROOM_INFO);
  const setShareRoomInfo = useSetRecoilState(shareRoomInfo);

  const getData = async (shareRoomID: number) => {
    const response = await getShareRoomDetailAPI(shareRoomID);

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

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      title: e.target.value,
    });
  };

  const onChangeDateHandler = (selectedDate: ISelectedDate) => {
    setForm({
      ...form,
      startDate: selectedDate.submitStartDate,
      endDate: selectedDate.submitEndDate,
    });
  };

  return {
    form,
    backUpForm,
    setForm,
    getData,
    setBackForm,
    setScheduleShareRoomInfo,
    onChangeTitleHandler,
    onChangeDateHandler,
    scheduleShareRoomInfo,
  } as const;
};

export default useShareRoomForm;
