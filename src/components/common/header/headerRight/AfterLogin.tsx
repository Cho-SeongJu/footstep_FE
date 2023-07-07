import { Link } from "react-router-dom";
import { MouseEvent, FunctionComponent } from "react";
import { useLoginState } from "../../../../hooks/useLoginState";
import Swal from "sweetalert2";

const AfterLogin: FunctionComponent = () => {
  const { logout } = useLoginState();

  const handleLogout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    Swal.fire({
      icon: "question",
      text: "로그아웃 하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  return (
    <div className="flex justify-center items-center h-[4rem] font-semibold">
      <Link
        to="/user/profile"
        className={`flex items-center px-2 py-4 h-[4rem] hover:bg-sky-005 hover:text-white-001 rounded-sm transition-all duration-100 ${
          location.pathname === "/" && "hover:bg-sky-005 hover:text-black-001"
        }`}
      >
        마이페이지
      </Link>
      <button
        type="button"
        className={`px-2 py-4 h-[4rem] hover:bg-sky-005 hover:text-white-001 rounded-sm transition-all duration-100 ${
          location.pathname !== "/" && "hover:bg-white-005 hover:text-black-001"
        }`}
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
};

export default AfterLogin;
