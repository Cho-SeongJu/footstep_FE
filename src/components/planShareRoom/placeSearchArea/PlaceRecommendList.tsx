import { useRecoilValue } from "recoil";
import { recommendPlaceList } from "../../../store/recommendPlaceList";
import { placeSearchResult } from "../../../store/placeSearchResult";
import { ReactComponent as Address } from "../../../assets/address.svg";
import useSchedule from "../../../hooks/useSchdule";

interface IPlace {
  readonly addressName: string;
  readonly placeName: string;
  readonly x: number;
  readonly y: number;
}

interface IProps {
  readonly panTo: (placeX: number, placeY: number, index: number) => void;
}

const PlaceRecommendList = ({ panTo }: IProps) => {
  const { addDestination } = useSchedule();
  const recommendPlaces = useRecoilValue(recommendPlaceList);
  const placeSearchList = useRecoilValue(placeSearchResult);

  const isExist = recommendPlaces.length !== 0;

  const onClickAddPlaceHandler = (place: IPlace) => {
    addDestination({
      placeName: place.placeName,
      addressName: place.addressName,
      y: Number(place.y),
      x: Number(place.x),
    });
  };

  return (
    <div>
      <h3 className="flex mt-4 ml-4 font-DoHyeon font-normal text-2xl">
        <span className="mr-2">
          <Address
            width={25}
            height={25}
          />
        </span>
        이런 장소는 어때요?
      </h3>
      <div className="h-[15rem] overflow-y-auto">
        {isExist ? (
          <ul id="placesList">
            {recommendPlaces.map((place: IPlace, index) => (
              <li
                key={place.addressName + index}
                className={`flex my-3 py-4 h-[6rem] bg-white hover:bg-gray-006 border-b border-b-gray-004 shadow-sm cursor-pointer ${
                  index === 0 && "border-t border-t-gray-004"
                }`}
              >
                <div
                  onClick={() =>
                    panTo(
                      Number(place.y),
                      Number(place.x),
                      index + placeSearchList.length
                    )
                  }
                >
                  <div className="ml-4 w-[17em]">
                    <div className="mb-1">
                      <p className="w-[17rem] font-medium text-lg text-black-002 truncate ">
                        {place.placeName}
                      </p>
                    </div>
                    <p className="font-normal text-sm">{place.addressName}</p>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="w-9 h-9 bg-white hover:bg-blue-004 border border-gray-003 hover:border-blue-004 rounded-md shadow-sm text-[0.7rem] hover:text-white"
                    onClick={() => onClickAddPlaceHandler(place)}
                  >
                    추가
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex justify-center mt-8 font-NanumGothic font-bold text-gray-002 text-sm">
            <p>검색결과가 존재하지 않습니다.</p>
          </div>
        )}
        <div
          id="pagination"
          className="flex justify-center items-center"
        ></div>
      </div>
    </div>
  );
};

export default PlaceRecommendList;
