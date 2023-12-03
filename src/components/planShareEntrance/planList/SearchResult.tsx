import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import testImage from "../../../assets/temporary/nature-6517866_1920.jpg";
import { ReactComponent as RightArrow } from "../../../assets/rightArrow.svg";
import { searchShareRoomData } from "../../../store/searchShareRoom";
import { IShareRoom } from "../../../type/planShareRoom";
import { sendTokenEnteringShareRoom } from "../../../api/shareRoomAPI";

const SearchResult = () => {
  const result: IShareRoom = useRecoilValue(searchShareRoomData);

  return (
    <div className="flex flex-col mb-20">
      <h1 className="lg:w-[20rem] sm:w-[15rem] md:text-2xl sm:text-xl text-lg font-bold">
        검색결과
      </h1>
      <div className="mt-6">
        <Link
          to={`/planShareRoom/${result.shareId}`}
          className="group flex md:flex-row sm:flex-col flex-col mx-auto my-4 lg:w-[59.5rem] md:w-[44rem] sm:w-[20rem] w-[15rem] border-gray-003 border rounded-xl transition-all duration-100 ease-out hover:scale-105"
          onClick={() => sendTokenEnteringShareRoom(result.shareId)}
        >
          <div className="sm:w-[20rem] sm:h-[15rem]">
            <img
              className="sm:h-full h-[12rem] md:rounded-l-xl md:rounded-tr-none rounded-t-xl object-cover sm:w-[320px] w-[239px] sm:h-[240px]"
              src={testImage}
              alt=""
            />
          </div>
          <div className="grow md:block flex flex-col items-center md:ml-6">
            <div className="md:mt-10 mt-8 font-bold lg:text-3xl md:text-2xl sm:text-xl">
              {result.shareName}
            </div>
            <div className="md:mt-4 mt-2 lg:text-2xl md:text-xl sm:text-lg">
              {result.travelStartDate} ~ {result.travelEndDate}
            </div>
            <div className="md:mt-12 md:mr-4 my-6">
              <p className="sm:text-sm text-[0.5rem] text-gray-002 md:text-left text-center">
                여행 일정은 입장코드를 공유 받은 인원만 입장 가능합니다.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center md:w-20 py-1 w-full md:rounded-r-xl md:rounded-bl-none md:rounded-tl-none rounded-bl-xl rounded-br-xl rounded-t-xl bg-sky-002 md:transition-all md:duration-100 md:ease-out md:group-hover:w-24">
            <RightArrow
              width={20}
              height={20}
              fill="#FFFFFF"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SearchResult;
