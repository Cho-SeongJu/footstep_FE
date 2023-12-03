import { useRecoilState } from "recoil";
import { openToggleState } from "../../../../state/openToggleState";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { ReactComponent as Exit } from "../../../../assets/exit.svg";
import AfterLogginIn from "./AfterLoggingIn";
import NoLogin from "./NoLogin";

const Toggle = () => {
  const [isOpenToggle, setIsOpenToggle] = useRecoilState(openToggleState);
  const [cookies] = useCookies(["accessToken"]);

  const closeToggleHandler = () => {
    setIsOpenToggle(false);
  };

  useEffect(() => {
    const bodyDOM = document.body;

    if (isOpenToggle) {
      bodyDOM.style.overflow = "hidden";
    } else {
      bodyDOM.style.overflow = "auto";
    }
  }, [isOpenToggle]);

  return (
    <div
      className={`${
        isOpenToggle ? "flex justify-between right-0" : "hidden right-[-5rem]"
      } fixed top-0 left-0 z-[52] pt-6 min-w-screen min-h-screen bg-[rgba(0,205,255,0.7)] transition duration-[2ms] ease-in-out`}
    >
      <div className="mx-4">
        <button onClick={closeToggleHandler}>
          <Exit
            width={40}
            height={40}
            className="hover:fill-gray-001"
          />
        </button>
      </div>
      <div className="mr-6">
        {cookies.accessToken ? <AfterLogginIn /> : <NoLogin />}
      </div>
    </div>
  );
};

export default Toggle;
