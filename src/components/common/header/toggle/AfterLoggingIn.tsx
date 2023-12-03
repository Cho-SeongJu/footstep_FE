import { Link, useLocation } from "react-router-dom";
import { MouseEvent } from "react";
import { useLastLocation } from "../../../../hooks/useLastLocation";
import { useLoginState } from "../../../../hooks/useLoginState";
import Swal from "sweetalert2";
import { useSetRecoilState } from "recoil";
import { openToggleState } from "../../../../state/openToggleState";

const AfterLogginIn = () => {
  const location = useLocation();
  const saveLastLocation = useLastLocation();
  const setIsOpenToggle = useSetRecoilState(openToggleState);
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
        saveLastLocation();
        logout();
      }
    });
  };

  const checkCurrentLocationHandler = () => {
    if (location.pathname === "/") setIsOpenToggle(false);
  };

  const menus = [
    {
      menu: "마이페이지",
      path: "/user/profile",
    },
    {
      menu: "About",
      path: "/",
    },
    {
      menu: "여행일정",
      path: "/planShareEntrance",
    },
    {
      menu: "커뮤니티",
      path: "/community",
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-end text-white text-xl font-extrabold rounded-md">
        {menus.map((menu) => (
          <Link
            key={menu.menu}
            to={menu.path}
            onClick={checkCurrentLocationHandler}
            className="px-4 py-4 hover:bg-sky-003 hover:text-black-002"
          >
            {menu.menu}
          </Link>
        ))}
        <button
          type="button"
          onClick={handleLogout}
          className="flex px-4 py-4 hover:bg-sky-003 hover:text-black-002"
        >
          로그아웃
        </button>
      </div>
    </>
  );
};

export default AfterLogginIn;
