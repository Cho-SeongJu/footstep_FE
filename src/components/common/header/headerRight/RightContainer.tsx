import { useCookies } from "react-cookie";
import AfterLogin from "./AfterLogin";
import SignInAndUp from "./SignInAndUp";

const RightContainer = () => {
  const [cookies] = useCookies(["accessToken"]);

  return (
    <section className="flex justify-end items-center w-[30rem] h-[4rem]">
      <div className="flex items-center">
        {!cookies.accessToken ? <SignInAndUp /> : <AfterLogin />}
      </div>
    </section>
  );
};

export default RightContainer;
