import Toggle from "../components/common/header/toggle/Toggle";
import Footer from "../components/common/footer/Footer";
import HeaderContainer from "../components/common/header/HeaderContainer";
import Post from "../components/community/postPage/Post";

const PostPage = () => {
  return (
    <div>
      <Toggle />
      <HeaderContainer />
      <Post />
      <Footer />
    </div>
  );
};

export default PostPage;
