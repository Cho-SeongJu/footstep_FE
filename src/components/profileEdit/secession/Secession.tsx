import { useState } from "react";
import { deleteMember, getUserInfo } from "../../../api/profileAPI";
import { getCookie } from "../../../utils/cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useLoginState } from "../../../hooks/useLoginState";

const Secession = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const navigate = useNavigate();
  const { logout } = useLoginState();

  const onClickCheckedHandler = () => {
    setChecked(!checked);
  };

  const onClickSecessionHandler = async () => {
    if (!checked) {
      Swal.fire(
        "회원탈퇴 동의 필요",
        "회원탈퇴 동의를 체크하셔야 탈퇴가 가능합니다.",
        "info"
      );
      return;
    }

    const result = await Swal.fire({
      title: "정말 탈퇴하시겠습니까?",
      text: "탈퇴 후 데이터 복구는 불가능합니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "탈퇴하기",
      cancelButtonText: "취소",
    });

    if (result.isConfirmed) {
      try {
        const token = await getCookie("accessToken");
        const userData = await getUserInfo(token);
        await deleteMember(userData.memberId);

        logout();

        Swal.fire("탈퇴 완료", "회원 탈퇴가 완료되었습니다", "success");

        navigate("/");
      } catch (error) {
        console.error(error);
        Swal.fire("오류 발생", "회원 탈퇴 중 오류가 발생하였습니다.", "error");
      }
    }
  };

  return (
    <div className="sm:h-[35rem] h-[30rem]">
      <div className="flex flex-col">
        <div className="flex flex-col items-center m-center pt-32 w-full md:w-[30rem] sm:text-xl text-sm">
          <p className="text-center mx-2 md:mx-0 break-keep">
            탈퇴 시 이용중인 서비스 사용이 불가능하며,
          </p>
          <p className="text-center mx-2 md:mx-0 break-keep">
            등록된 데이터는 모두 삭제가 되며 복구가 불가능합니다.
          </p>
          <p className="mt-8 sm:text-2xl text-xl font-bold">
            그래도 탈퇴하시겠습니까?
          </p>
        </div>
        <div className="flex items-center m-center mt-6">
          <input
            id="check"
            type="checkbox"
            className="w-4 h-4 cursor-pointer"
            onClick={onClickCheckedHandler}
          />
          <label
            htmlFor="check"
            className="ml-2 text-sm cursor-pointer"
          >
            회원탈퇴에 동의합니다.
          </label>
        </div>
        <div className="m-center">
          <button
            onClick={onClickSecessionHandler}
            type="button"
            className="mt-8 px-4 py-3 border-2 border-red-001 rounded-md text-red-001 text-2xl font-bold hover:bg-red-001 hover:text-white"
          >
            회원탈퇴
          </button>
        </div>
      </div>
    </div>
  );
};

export default Secession;
