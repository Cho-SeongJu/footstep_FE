import { Link } from "react-router-dom";

const SignUpLink = () => {
  return (
    <div className="flex justify-center mt-6 min-w-max">
      <p className="text-sm">아직 회원이 아니신가요?</p>
      <Link to="/user/signup">
        <p className="ml-2 text-sky-001 text-sm font-medium">회원가입</p>
      </Link>
    </div>
  );
};

export default SignUpLink;
