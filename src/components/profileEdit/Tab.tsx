import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Tab = () => {
  const location = useLocation();
  const [selected, setSelected] = useState("");

  const tabs = [
    {
      menu: "profileEdit",
      text: "회원정보수정",
      path: "/user/profile/edit",
    },
    {
      menu: "passwordEdit",
      text: "비밀번호변경",
      path: "/user/profile/passwordEdit",
    },
    {
      menu: "userSecession",
      text: "회원탈퇴",
      path: "/user/profile/secession",
    },
  ];

  useEffect(() => {
    const currentTab = tabs.find((tab) => tab.path === location.pathname);
    if (currentTab) {
      setSelected(currentTab.menu);
    }
  }, [location.pathname]);

  const onClickHandler = (menu: string) => {
    setSelected(menu);
  };

  return (
    <div className="flex justify-center items-center w-full border-b border-gray-003">
      {tabs.map((tab) => (
        <Link
          key={tab.menu}
          className={`mx-2 px-2 py-4 md:text-base text-sm ${
            selected === tab.menu &&
            "border-b-[0.2rem] border-blue-002 text-blue-002 text-lg font-bold"
          } hover:text-blue-002`}
          onClick={() => onClickHandler(tab.menu)}
          to={tab.path}
        >
          {tab.text}
        </Link>
      ))}
    </div>
  );
};

export default Tab;
