import { Link } from "react-router-dom";
import { ReactComponent as LogoIcon } from "../../../../assets/footStepLogo.svg";

const Logo = () => {
  return (
    <Link
      to="/"
      className="w-32 h-16"
    >
      <LogoIcon
        width={100}
        height={50}
        className="fill-[#995d5d]"
      />
    </Link>
  );
};

export default Logo;
