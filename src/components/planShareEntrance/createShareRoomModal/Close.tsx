import { useRecoilState } from "recoil";
import { createModalOpenState } from "../../../state/createModalOpen";
import { ReactComponent as CloseIcon } from "../../../assets/close.svg";

const Close = () => {
  const [openCreateModal, setOpenCreateModal] =
    useRecoilState(createModalOpenState);

  const onClickHandler = () => {
    setOpenCreateModal(!openCreateModal);
  };

  return (
    <div className="flex flex-row-reverse items-center w-full sm:w-[24rem] h-[3rem] bg-gray-003 rounded-t-md">
      <CloseIcon
        className="mx-2 w-[25px] h-[25px] cursor-pointer"
        onClick={onClickHandler}
      />
    </div>
  );
};

export default Close;
