import { ReactComponent as RightArrow } from "../../../assets/rightArrow.svg";
import testImage from "../../../assets/temporary/nature-6517866_1920.jpg";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getShareRoomList } from "../../../store/getShareRoomList";

const ExistsParticipatingPlan = () => {
  const plans = useRecoilValue(getShareRoomList);

  return (
    <div className="w-full px-2 md:px-0 xl:w-[58rem] lg:w-[38rem] md:w-[30rem] h-[40rem] overflow-auto">
      {plans.shareRoomDtoList.map((plan) => (
        <Link
          key={plan.shareId}
          to={`/planShareRoom/${plan.shareId}`}
          className="group flex flex-col md:flex-row mx-auto md:mx-0 my-8 xl:w-[55rem] lg:w-[35rem] md:w-[27rem] w-[17rem] h-[30rem] xl:h-[13rem] lg:h-[11rem] md:h-[10rem] border border-gray-003 rounded-xl cursor-pointer"
        >
          <div className="w-full h-full lg:w-[20rem] md:w-[25rem] md:rounded-l-xl sm:rounded-t-xl rounded-t-xl overflow-hidden">
            <img
              className=" min-h-full object-cover"
              src={plan.imageUrl || testImage}
              alt="thumbnail"
            />
          </div>
          <div className="md:ml-6 w-full md:w-[34rem]">
            <div className="lg:mt-8 md:mt-4 mt-8 text-center md:text-left font-bold xl:text-3xl lg:text-2xl md:text-lg text-xl">
              {plan.shareName}
            </div>
            <div className="xl:mt-3 lg:mt-2 md:mt-1 mt-4 text-center md:text-left xl:text-2xl lg:text-xl md:text-lg text-xl">
              {plan.travelStartDate} ~ {plan.travelEndDate}
            </div>
            <div className="my-4 xl:mt-10 lg:mt-6 md:mt-4 md:mr-4 text-center md:text-left xl:text-sm lg:text-[0.8rem] md:text-[0.7rem] text-[0.6rem] text-gray-002">
              여행 일정은 입장코드를 공유 받은 인원만 입장 가능합니다.
            </div>
          </div>
          <div className="flex justify-center items-center w-full md:w-20 py-2 md:py-0 rounded-b-xl md:rounded-r-xl md:rounded-bl-none bg-blue-002 transition-all duration-100 ease-out md:group-hover:w-24">
            <RightArrow
              width={20}
              height={20}
              fill="#FFFFFF"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ExistsParticipatingPlan;
