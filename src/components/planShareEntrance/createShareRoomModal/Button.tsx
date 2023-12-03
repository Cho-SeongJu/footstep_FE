import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createShareRoomAPI } from "../../../api/shareRoomAPI";
import { createModalOpenState } from "../../../state/createModalOpen";
import { getShareRoomList } from "../../../store/getShareRoomList";
import { IForm } from "../../../type/shareRoomForm";
import { formValidationCheck } from "../../../utils/formValidationCheck";

interface IProps {
  form: IForm;
}

const Button = ({ form }: IProps) => {
  const [openCreateModal, setOpenCreateModal] =
    useRecoilState(createModalOpenState);
  const navigate = useNavigate();
  const [shareRooms, setShareRooms] = useRecoilState(getShareRoomList);
  const MySwal = withReactContent(Swal);

  const onClickCreateHandler = async () => {
    console.log(form);
    if (!formValidationCheck(form)) return;

    const response = await createShareRoomAPI(form);

    if (response?.status === 200) {
      const shareRoomId = response.data.shareId;
      const planList = response.data;
      console.log(planList);

      MySwal.fire({
        title: "등록이 완료되었습니다.",
        text: "일정 공유방에 입장 하시겠습니까?",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then((result) => {
        result.isConfirmed
          ? navigate(`/planShareRoom/${shareRoomId}`)
          : setShareRooms({
              ...shareRooms,
              shareRoomDtoList: [...shareRooms.shareRoomDtoList, planList],
            });
      });
    } else {
      MySwal.fire({
        icon: "error",
        text: "처리 중 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요",
      });
    }

    setOpenCreateModal(false);
  };

  const clickCancleHandler = () => {
    setOpenCreateModal(!openCreateModal);
  };

  return (
    <div className="mt-12">
      <button
        type="button"
        className="mx-4 px-5 py-3 bg-platinum-001 rounded-lg text-white text-lg font-bold"
        onClick={onClickCreateHandler}
      >
        생성
      </button>
      <button
        type="button"
        className="mx-4 px-5 py-3 bg-gray-001 rounded-lg text-white text-lg font-bold"
        onClick={clickCancleHandler}
      >
        취소
      </button>
    </div>
  );
};

export default Button;
