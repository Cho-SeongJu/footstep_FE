import { redefineCookie } from "../utils/cookie";
import PlanShareRoom from "../components/planShareRoom/PlanShareRoom";
import { useRequireAuth } from "../hooks/useRequireAuth";
import { useEffect } from "react";

const PlanShareRoomPage = () => {
  const { checkLocationPath } = useRequireAuth();

  useEffect(() => {
    checkLocationPath();
    redefineCookie();
  }, []);

  return (
    <div className="relative">
      <PlanShareRoom />
    </div>
  );
};

export default PlanShareRoomPage;
