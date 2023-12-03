import { useEffect } from "react";
import Footer from "../components/common/footer/Footer";
import HeaderContainer from "../components/common/header/HeaderContainer";
import Toggle from "../components/common/header/toggle/Toggle";
import Content from "../components/main/Content";
import { redefineCookie } from "../utils/cookie";

const AboutPage = () => {
  useEffect(() => {
    redefineCookie();
  }, []);

  return (
    <>
      <Toggle />
      <HeaderContainer />
      <Content />
      <Footer />
    </>
  );
};

export default AboutPage;
