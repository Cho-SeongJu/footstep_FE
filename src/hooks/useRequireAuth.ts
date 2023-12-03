import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../utils/cookie";

const restrictedPages = [
  "/planShareEntrance",
  "/user/profile",
  "/user/profile/edit",
  "/user/profile/passwordEdit",
  "/user/profile/secession",
  "/community/newpost",
];

export const useRequireAuth = () => {
  const { shareRoomID } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const token = getCookie("accessToken");

  const checkLocationPath = () => {
    const isIncludePath =
      location.pathname.includes(`/planShareRoom/${shareRoomID}`) ||
      (restrictedPages.includes(location.pathname) && token !== undefined);

    if (!isIncludePath) {
      navigate("/login");
    }
  };

  return { checkLocationPath };
};
