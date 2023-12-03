import { useCheckOpenToggle } from "../../hooks/useCheckOpenToggle";
import ParticipatingPlan from "./participatingPlan/ParticipatingPlan";
import ProfileUserInfo from "./profileUserInfo/ProfileUserInfo";
import { useEffect } from "react";

const Profile = () => {
  const { checkOpenToggle } = useCheckOpenToggle();

  useEffect(() => {
    checkOpenToggle();
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-center m-center min-h-[55rem]">
      <ProfileUserInfo />
      <ParticipatingPlan />
    </div>
  );
};

export default Profile;
