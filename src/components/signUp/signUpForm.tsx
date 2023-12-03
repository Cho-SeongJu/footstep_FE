import { kakaoLogin } from "../../api/kakaoLoginAPI";
import { ReactComponent as Kakao } from "../../assets/kakao.svg";
import { useSignUpForm } from "../../hooks/useSignUpForm";
import { ReactComponent as LogoIcon } from "../../assets/footStepLogo.svg";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const {
    register,
    errors,
    isCheckEmail,
    genderType,
    handleSubmit,
    onSubmitHandler,
    onClickCheckEmailHandler,
    onClickGenderHandler,
    onKeyDownEmailHandler,
    onBlurEmailHandler,
    onClickCheckNicknameHandler,
    onKeyDownNicknameHandler,
    onBlurNicknameHandler,
    isCheckNickname,
    watch,
    resetEmailDomainHandler,
  } = useSignUpForm();
  const { password, checkPassword } = watch();

  return (
    <div className="mt-[8rem] mx-auto w-[20rem]">
      <Link to="/" className="flex justify-center mb-20">
        <LogoIcon width={200} height={100} className="fill-[#995d5d]" />
      </Link>
      <h1 className="mb-12 text-black-002 font-bold text-xl">회원가입</h1>
      <div className="mb-8">
        <p className="flex justify-center mb-2 text-[0.85rem] text-gray-001">
          카카오계정으로 간편 회원가입
        </p>
        <button
          className="flex justify-center items-center mx-auto w-[20rem] h-[3.2rem] bg-yellow-001 hover:bg-yellow-002 rounded-md text-white font-bold"
          onClick={kakaoLogin}
          type="button"
        >
          <Kakao width={25} height={25} className="mr-2" />
          카카오계정으로 회원가입
        </button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col mx-auto w-[20rem] h-screen bg-white"
      >
        <div className="mb-6">
          <label className="block mb-3 font-bold text-black-002">이메일</label>

          <input
            type="text"
            id="loginEmailId"
            {...register("loginEmailId")}
            onKeyDown={onKeyDownEmailHandler}
            onBlur={onBlurEmailHandler}
            className="w-full px-4 py-3 border border-gray-003 outline-none rounded-md placeholder:text-gray-002 placeholder:text-sm"
            placeholder="이메일 아이디를 입력하세요"
          />
          <div className="flex mt-2">
            <div className="flex items-center h-[3.2rem] mr-2 place-self-end">
              @
            </div>
            <input
              list="emailDomains"
              type="text"
              id="loginEmailDomain"
              {...register("loginEmailDomain")}
              onKeyDown={onKeyDownEmailHandler}
              onBlur={onBlurEmailHandler}
              onFocus={resetEmailDomainHandler}
              className="w-full px-4 py-3 border border-gray-003 outline-none rounded-md placeholder:text-gray-002 placeholder:text-sm"
              placeholder="이메일 주소를 선택해주세요"
            />

            <datalist id="emailDomains">
              <option value="naver.com" />
              <option value="daum.net" />
              <option value="gmail.com" />
              <option value="yahoo.com" />
              <option value="직접입력" />
            </datalist>
          </div>
          <p
            className={`text-[0.75rem] ${
              !isCheckEmail.check ? "text-red-001" : "text-blue-002"
            }`}
          >
            {isCheckEmail.checkEmailMsg.length !== 0
              ? isCheckEmail.checkEmailMsg
              : (errors.loginEmailId && errors.loginEmailId.message) ||
                (errors.loginEmailDomain && errors.loginEmailDomain.message)}
          </p>
          <button
            type="button"
            className="mt-4 mx-auto w-[20rem] h-[3.2rem] bg-platinum-001 hover:bg-platinum-002 rounded-md text-white font-bold"
            onClick={onClickCheckEmailHandler}
          >
            중복확인
          </button>
        </div>
        <div className="mb-6">
          <label className="block mb-3 font-bold text-black-002">
            비밀번호
          </label>
          <p className="mb-2 text-[0.75rem] text-gray-001">
            영문, 숫자, 특수문자를 포함한 8~16자 비밀번호를 입력해주세요.
          </p>
          <input
            type="password"
            {...register("password")}
            className="w-full px-4 py-3 border border-gray-003 outline-none rounded-md placeholder:text-gray-002 placeholder:text-sm"
            placeholder="비밀번호"
            maxLength={16}
          />
          {errors.password && (
            <p className="text-[0.75rem] text-red-001">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label className="block mb-3 font-bold text-black-002">
            비밀번호 확인
          </label>
          <input
            type="password"
            {...register("checkPassword")}
            className="w-full px-4 py-3 border border-gray-003 outline-none rounded-md placeholder:text-gray-002 placeholder:text-sm"
            placeholder="비밀번호 확인"
          />
          <p className="text-[0.75rem] text-red-001">
            {errors.checkPassword?.message ||
              (password !== checkPassword && "비밀번호가 일치하지 않습니다.")}
          </p>
          <p className="text-[0.75rem] text-blue-002">
            {password && password == checkPassword && "비밀번호가 일치합니다."}
          </p>
        </div>
        <div className="mb-6">
          <label className="block mb-3 font-bold text-black-002">닉네임</label>
          <p className="mb-2 text-[0.8rem] text-gray-001">
            닉네임은 2자 이상 10자 이하로 입력해주세요.
          </p>
          <input
            type="text"
            id="nickname"
            {...register("nickname")}
            onKeyDown={onKeyDownNicknameHandler}
            onBlur={onBlurNicknameHandler}
            className="w-full px-4 py-3 border border-gray-003 outline-none rounded-md placeholder:text-gray-002 placeholder:text-sm"
            placeholder="별명 (2~10자)"
          />
          <p
            className={`text-[0.75rem] ${
              !isCheckNickname.check ? "text-red-001" : "text-blue-002"
            }`}
          >
            {isCheckNickname.checkNicknameMsg.length !== 0
              ? isCheckNickname.checkNicknameMsg
              : errors.nickname && errors.nickname.message}
          </p>
          <button
            type="button"
            className="mt-4 mx-auto w-[20rem] h-[3.2rem] bg-platinum-001 hover:bg-platinum-002 rounded-md text-white font-bold"
            onClick={onClickCheckNicknameHandler}
          >
            중복확인
          </button>
        </div>
        <div className="mb-12">
          <p className="mb-3 font-bold text-black-002">성별</p>
          <div className="flex w-full">
            <button
              type="button"
              className={`grow py-3 border border-gray-003 hover:border-blue-004 rounded-l-md ${
                genderType.gender === "male" && "bg-blue-003 text-white"
              } hover:bg-blue-004 font-bold hover:text-white transition-colors duration-100`}
              onClick={() => onClickGenderHandler("male")}
            >
              남성
            </button>
            <button
              type="button"
              className={`grow py-3 border-t border-r border-b border-gray-003 hover:border-blue-004 font-bold hover:text-white rounded-r-md ${
                genderType.gender === "female" && "bg-blue-003 text-white"
              } hover:bg-blue-004 transition-colors duration-100`}
              onClick={() => onClickGenderHandler("female")}
            >
              여성
            </button>
          </div>
          {errors.gender && (
            <p className="text-[0.75rem] text-red-001">
              {errors.gender.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="block w-full p-3 bg-blue-002 text-white-001 rounded-md hover:bg-blue-003 text-lg font-bold transition-colors duration-100"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
