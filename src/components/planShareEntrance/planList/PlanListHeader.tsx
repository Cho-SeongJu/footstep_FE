import { useRecoilState } from "recoil";
import { createModalOpenState } from "../../../state/createModalOpen";

const PlanListHeader = () => {
  const [open, setOpen] = useRecoilState(createModalOpenState);

  const onClickHandler = () => {
    window.scrollTo({ top: 0, left: 0 });
    setOpen(!open);
  };

  return (
    <div className="m-center lg:w-[60rem] sm:w-[37rem] w-[17rem]">
      <div className="flex flex-row-reverse">
        <button
          id="createBtn"
          type="button"
          className="sm:px-4 sm:py-3 px-2 py-3 float-right bg-sky-005 rounded-xl font-bold text-white text-sm md:text-xl sm:text-lg"
          onClick={onClickHandler}
        >
          방 생성하기
        </button>
      </div>
    </div>
  );
};

export default PlanListHeader;
