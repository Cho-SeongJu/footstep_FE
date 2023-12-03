import { ReactComponent as GitHub } from "../../../assets/github-mark-white.svg";
import { ReactComponent as Logo } from "../../../assets/footStepLogo.svg";

const FooterLink = () => {
  return (
    <div className="flex justify-center mb-6 font-bold text-white">
      <div>
        <Logo
          width={100}
          height={50}
          className="px-2 fill-white"
        />
      </div>
      <a
        href="https://github.com/FootStepteam"
        target="_blank"
        className="flex items-center mx-[1rem] px-2"
        rel="noreferrer"
      >
        <GitHub />
      </a>
    </div>
  );
};

export default FooterLink;
