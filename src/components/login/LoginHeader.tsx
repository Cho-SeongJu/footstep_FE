import { Link } from "react-router-dom";
import { ReactComponent as LogoIcon } from "../../assets/footStepLogo.svg";

const LoginHeader = () => {
  return (
    <>
      <Link
        to="/"
        className="mx-auto mb-4 min-w-max font-black text-[56px]"
      >
        <LogoIcon
          width={200}
          height={80}
          className="fill-[#995d5d]"
        />
      </Link>
      <div className="mt-1 mx-auto min-w-max text-[20px] text-placeholder-color">
        함께하는 여행 계획 - 발자국
      </div>
    </>
  );
};
export default LoginHeader;
