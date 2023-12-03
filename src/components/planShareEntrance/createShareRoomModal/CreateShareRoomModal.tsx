import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { createModalOpenState } from "../../../state/createModalOpen";
import Calendar from "../../common/calendar/Calendar";
import Button from "./Button";
import Close from "./Close";
import Title from "./Title";
import useShareRoomForm from "../../../hooks/useShareRoomForm";
import { INITIAL_SHARE_ROOM_INFO } from "../../../constants/initial";

const CreateShareRoomModal = () => {
  const [openModal, setOpenModal] = useRecoilState(createModalOpenState);
  const modalRef = useRef<HTMLDivElement>(null);
  const { form, onChangeTitleHandler, onChangeDateHandler } =
    useShareRoomForm();

  const type = "create";

  const onClickModalBgHandler = (e: MouseEvent) => {
    const buttonDOM = document.querySelector("#createBtn");

    if (e.target !== buttonDOM && e.target === modalRef.current) {
      setOpenModal(false);
    }
  };

  useEffect(() => {
    if (openModal) {
      document.addEventListener("click", onClickModalBgHandler);
    }
    return () => {
      document.removeEventListener("click", onClickModalBgHandler);
    };
  });

  return (
    <div
      className="flex items-center absolute top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.6)] z-[99] animate-modalBgShow"
      role="presentation"
      ref={modalRef}
    >
      <div className="flex flex-col items-center m-center sm:w-[24rem] w-[15rem] h-[20rem] bg-white rounded-md shadow-md animate-modalShow">
        <Close />
        <Title
          form={form}
          onChangeTitleHandler={onChangeTitleHandler}
        />
        <Calendar
          type={type}
          editStatus={true}
          onChangeDateHandler={onChangeDateHandler}
          shareRoomInfo={INITIAL_SHARE_ROOM_INFO}
        />
        <Button form={form} />
      </div>
    </div>
  );
};

export default CreateShareRoomModal;
