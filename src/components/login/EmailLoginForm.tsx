import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signInWithEmail } from "../../api/emailLoginAPI";
import { useLoginState } from "../../hooks/useLoginState";
import { TLoginFormData } from "../../type/emailLogin";
import { useRecoilState } from "recoil";
import { openToggleState } from "../../../src/state/openToggleState";

const EmailLoginForm = () => {
  const savedLocation = sessionStorage.getItem("lastLocation");
  const { register, handleSubmit } = useForm<TLoginFormData>();
  const [isOpenToggle, setIsOpenToggle] = useRecoilState(openToggleState);
  const { login } = useLoginState();
  const navigate = useNavigate();

  const handleEmailLogin = async (data: TLoginFormData) => {
    const responseData = await signInWithEmail(data);

    if (responseData) {
      const accessToken = responseData.data.jwtAccessToken;
      const refreshToken = responseData.data.refreshToken;

      login(accessToken, refreshToken);

      if (isOpenToggle) setIsOpenToggle(false);

      if (savedLocation) {
        navigate(savedLocation);
      }
      if (!savedLocation) {
        navigate("/");
      }
    }
  };

  return (
    <form
      className="mx-auto w-[20rem] h-[15rem]"
      onSubmit={handleSubmit(handleEmailLogin)}
    >
      <div className="flex flex-col mt-[2rem]">
        <div className="h-[7rem]">
          <input
            className="p-4 w-full border border-gray-003 focus:border-4 rounded-t-md outline-none placeholder:text-sm"
            type="email"
            placeholder="이메일"
            {...register("email", { required: "이메일을 입력해주세요" })}
          />
          <input
            className="p-4 w-full border-r border-b border-l border-gray-003 focus:border-4 rounded-b-md outline-none placeholder:text-sm"
            type="password"
            placeholder="비밀번호"
            {...register("password", { required: "비밀번호를 입력해주세요" })}
          />
        </div>
      </div>
      <button
        className="flex justify-center items-center mt-6 p-2 mx-auto w-[20rem] h-[3.5rem] bg-blue-003 rounded-sm text-white text-lg font-bold"
        type="submit"
      >
        로그인
      </button>
    </form>
  );
};

export default EmailLoginForm;
