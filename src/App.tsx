import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileEditPage from "./pages/ProfileEditPage";
import CommunityPage from "./pages/CommunityPage";
import PlanShareEntrancePage from "./pages/PlanShareEntrancePage";
import AboutPage from "./pages/AboutPage";
import PlanShareRoomPage from "./pages/PlanShareRoomPage";
import SignUp from "./pages/SignUp";
import KakaoCallBack from "./components/login/KakaoCallBack";
import NewPost from "./pages/NewPost";
import Post from "./pages/Post";
import EditPost from "./components/community/postPage/EditPost";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/user/kakao/callback" element={<KakaoCallBack />} />
      <Route path="/user/signup" element={<SignUp />} />
      <Route path="/user/profile" element={<ProfilePage />} />
      <Route path="/user/profile/:path" element={<ProfileEditPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/community/newpost" element={<NewPost />} />
      <Route path="/community/:communityId" element={<Post />} />
      <Route path="/community/:communityId/edit" element={<EditPost />} />
      <Route path="/planShareEntrance" element={<PlanShareEntrancePage />} />
      <Route
        path="/planShareRoom/:shareRoomID"
        element={<PlanShareRoomPage />}
      />
    </Routes>
  );
};

export default App;
