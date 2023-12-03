import Toggle from "../components/common/header/toggle/Toggle";
import Footer from "../components/common/footer/Footer";
import HeaderContainer from "../components/common/header/HeaderContainer";
import PasswordEdit from "../components/profileEdit/passwordEdit/PasswordEdit";
import { useRequireAuth } from "../hooks/useRequireAuth";
import { useEffect } from "react";
import { redefineCookie } from "../utils/cookie";

const PasswordEditPage = () => {
  const { checkLocationPath } = useRequireAuth();

  useEffect(() => {
    checkLocationPath();
    redefineCookie();
  }, []);

  return (
    <>
      <Toggle />
      <HeaderContainer />
      <PasswordEdit />
      <Footer />
    </>
  );
};

export default PasswordEditPage;
