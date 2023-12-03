import Community from "../components/community/Community";
import Footer from "../components/common/footer/Footer";
import HeaderContainer from "../components/common/header/HeaderContainer";
import Toggle from "../components/common/header/toggle/Toggle";
import { useEffect } from "react";
import { redefineCookie } from "../utils/cookie";

const CommunityPage = () => {
  useEffect(() => {
    redefineCookie();
  }, []);

  return (
    <div>
      <Toggle />
      <HeaderContainer />
      <Community />
      <Footer />
    </div>
  );
};

export default CommunityPage;
