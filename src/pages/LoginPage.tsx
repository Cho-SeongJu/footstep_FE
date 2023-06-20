import EmailLoginForm from "../components/login/EmailLoginForm";
import KakaoLoginButton from "../components/login/KakaoLoginButton";
import LoginHeader from "../components/login/LoginHeader";
import SignUpLink from "../components/login/SignUpLink";

const LoginPage = () => {
  return (
    <div className="flex justify-center w-full min-h-screen">
      <div className="mt-[12rem] flex flex-col w-full">
        <LoginHeader />
        <EmailLoginForm />
        <KakaoLoginButton />
        <SignUpLink />
      </div>
    </div>
  );
};

export default LoginPage;
