import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../utils/cookie";

const restrictedPages = [
  "/planShareEntrance",
  "/user/profile",
  "/user/profile/edit",
];

export const useRequireAuth = () => {
  const { shareRoomID } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const token = getCookie("accessToken");
  const isIncludePath =
    location.pathname.includes(`/planShareRoom/${shareRoomID}`) ||
    (restrictedPages.includes(location.pathname) && !token);

  useEffect(() => {
    if (isIncludePath) {
      navigate("/login");
    }
  }, [token, navigate, restrictedPages, location]);
};
