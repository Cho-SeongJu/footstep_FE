import EditorArea from "../components/newPost/EditorArea";
import HeaderContainer from "../components/common/header/HeaderContainer";
import Footer from "../components/common/footer/Footer";
import { useRequireAuth } from "../hooks/useRequireAuth";
import Toggle from "../components/common/header/toggle/Toggle";
import { useEffect } from "react";
import { redefineCookie } from "../utils/cookie";

const NewPost = () => {
  const { checkLocationPath } = useRequireAuth();

  useEffect(() => {
    checkLocationPath();
    redefineCookie();
  }, []);

  return (
    <>
      <Toggle />
      <HeaderContainer />
      <EditorArea />
      <Footer />
    </>
  );
};

export default NewPost;
