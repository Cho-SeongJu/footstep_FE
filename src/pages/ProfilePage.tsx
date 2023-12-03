import Toggle from "../components/common/header/toggle/Toggle";
import Footer from "../components/common/footer/Footer";
import HeaderContainer from "../components/common/header/HeaderContainer";
import Profile from "../components/profile/Profile";
import { useEffect } from "react";
import { useRequireAuth } from "../hooks/useRequireAuth";
import { redefineCookie } from "../utils/cookie";

const ProfilePage = () => {
  const { checkLocationPath } = useRequireAuth();

  useEffect(() => {
    checkLocationPath();
    redefineCookie();
  }, []);

  return (
    <>
      <Toggle />
      <HeaderContainer />
      <Profile />
      <Footer />
    </>
  );
};

export default ProfilePage;
