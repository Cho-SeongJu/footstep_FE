import { useEffect, useRef, useState } from "react";
import LeftContainer from "./headerLeft/LeftContainer";
import RightContainer from "./headerRight/RightContainer";
import Logo from "./headerLeft/Logo";
import { ReactComponent as Toggle } from "../../../assets/menu.svg";
import { openToggleState } from "../../../state/openToggleState";
import { useRecoilState } from "recoil";

const HeaderContainer = () => {
  const [useToggle, setUseToggle] = useState<boolean>(false);
  const [isOpenToggle, setIsOpenToggle] = useRecoilState(openToggleState);

  const headerRef = useRef<HTMLElement>(null);

  const navResizeHandler = () => {
    if (headerRef.current) {
      if (headerRef.current.offsetWidth < 900 && !useToggle) {
        setUseToggle(true);
      } else if (headerRef.current.offsetWidth >= 900 && useToggle) {
        setUseToggle(false);
      }
    }
  };

  const onClickToggleHandler = () => {
    console.log(isOpenToggle);
    setIsOpenToggle(!isOpenToggle);
  };

  useEffect(() => {
    if (headerRef.current) {
      if (headerRef.current.offsetWidth < 900) {
        setUseToggle(true);
      } else {
        setUseToggle(false);
      }
    }
  }, [headerRef]);

  useEffect(() => {
    window.addEventListener("resize", navResizeHandler);

    return () => {
      window.removeEventListener("resize", navResizeHandler);
    };
  });

  return (
    <header
      className={
        "sticky top-0 px-4 py-6 w-full bg-white border-b border-gray-003 shadow-md text-black transition-colors duration-150 ease-in-out z-50"
      }
      ref={headerRef}
    >
      {!useToggle ? (
        <nav className="flex justify-between my-0 mx-auto 2xl:w-[90rem] xl:w-[70rem] lg:w-[50rem] sm:w-[50rem] h-[4rem]">
          <LeftContainer />
          <RightContainer />
        </nav>
      ) : (
        <nav className="flex justify-between px-8">
          <Logo />
          <Toggle
            width={50}
            height={50}
            onClick={onClickToggleHandler}
            className="cursor-pointer"
          />
        </nav>
      )}
    </header>
  );
};

export default HeaderContainer;
