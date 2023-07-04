import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as NoProfile } from "../../../assets/smile.svg";
import { getUserInfo } from "../../../api/profileAPI";
import { getCookie } from "../../../utils/cookie";

const ProfileUserInfo = () => {
  const [userInfo, setUserInfo] = useState<IMember | null>(null);
  const accessToken = getCookie("accessToken");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await getUserInfo(accessToken);
        setUserInfo(userData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserInfo();
  }, [accessToken]);
  return (
    <div className="mt-24 w-[20rem] mx-auto">
      <div className="m-center p-7 w-[17rem] min-h-fit border border-gray-004 rounded-xl shadow-sm">
        <div className="flex justify-center">
          {userInfo?.img ? (
            <img
              src={userInfo.img}
              alt="User"
              className="w-36 h-36 object-cover rounded-full border border-blue-001"
            />
          ) : (
            <NoProfile className="w-36 h-36 rounded-full" />
          )}
        </div>
        <section className="w-[13rem] mt-8 mx-auto">
          <div className="mb-4 w-[13rem]">
            <h1 className="font-bold text-md text-black-002">닉네임</h1>
            <div className="h-8 text-black-003">{userInfo?.nickname}</div>
          </div>
          <div className="mb-4 w-[13rem]">
            <h1 className="font-bold text-md text-black-002">이메일</h1>
            <div className="h-8 tracking-[-0.5px] text-black-003">
              {userInfo?.loginEmail}
            </div>
          </div>
          <div className="mb-4 w-[13rem]">
            <h1 className="font-bold text-md text-black-002">내 소개</h1>
            <div className="h-8 tracking-[-0.5px] text-black-003">
              {userInfo?.description}
            </div>
          </div>
        </section>
        <div className="flex justify-center mt-4 ">
          <Link
            to="/user/profile/edit"
            className="px-3 py-2 border border-sky-005 rounded-md text-xs text-blue-001 hover:bg-blue-001 hover:text-white transition-colors duration-200"
            role="button"
          >
            편집
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileUserInfo;
