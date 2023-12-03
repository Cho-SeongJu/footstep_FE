import { kakaoLogin } from "../../api/kakaoLoginAPI";
import { ReactComponent as Kakao } from "../../assets/kakao.svg";

const KakaoLoginButton = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="mt-14 mb-2 text-sm text-gray-001">
        카카오계정으로 간편 로그인/회원가입
      </p>
      <button
        type="button"
        className="flex justify-center items-center mx-auto bg-yellow-001 w-[20rem] h-[3.5rem] rounded-sm text-white font-bold"
        onClick={kakaoLogin}
      >
        <Kakao
          width={25}
          height={25}
        />
        카카오로 시작하기
      </button>
    </div>
  );
};

export default KakaoLoginButton;
