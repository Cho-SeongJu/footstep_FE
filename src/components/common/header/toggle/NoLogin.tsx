import { Link } from "react-router-dom";

const NoLogin = () => {
  return (
    <>
      <p className="mt-2 mb-4 text-black-002 font-bold sm:text-2xl text-lg">
        로그인 이후 이용 가능합니다.
      </p>
      <div className="flex justify-end text-white text-xl rounded-md">
        <Link
          to={"/login"}
          className="px-4 py-4 hover:bg-sky-003 hover:text-black-002"
        >
          로그인/회원가입
        </Link>
      </div>
    </>
  );
};

export default NoLogin;
