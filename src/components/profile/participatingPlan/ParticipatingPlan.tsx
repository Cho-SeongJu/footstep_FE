import { getShareRoomList } from "../../../store/getShareRoomList";
import ExistsParticipatingPlan from "./ExistsParticipatingPlan";
import NotExistsParticipatingPlan from "./NotExistsParticipatingPlan";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { getCookie } from "../../../utils/cookie";
import { useNavigate } from "react-router-dom";
import { getIncludeShareRoomAPI } from "../../../api/shareRoomAPI";

const ParticipatingPlan = () => {
  const navigate = useNavigate();
  const [shareRooms, setShareRooms] = useRecoilState(getShareRoomList);

  const isExists = shareRooms.totalPages !== 0;

  const getShareRooms = async () => {
    const result = await getIncludeShareRoomAPI();
    setShareRooms(result);
  };

  useEffect(() => {
    const token = getCookie("accessToken");

    if (token === undefined) {
      navigate("/login");
    } else {
      getShareRooms();
    }
  }, []);

  return (
    <div>
      <section className="mt-24 ml-0 xl:ml-24 lg:ml-12 md:ml-6">
        <h1 className="text-center md:text-left mb-4 text-xl font-bold tracking-tight">
          참여중인 여행 일정{" "}
          <span className="ml-2 text-blue-003">
            {shareRooms.shareRoomDtoList.length}
          </span>
        </h1>
        {isExists ? (
          <ExistsParticipatingPlan />
        ) : (
          <NotExistsParticipatingPlan />
        )}
      </section>
    </div>
  );
};

export default ParticipatingPlan;
