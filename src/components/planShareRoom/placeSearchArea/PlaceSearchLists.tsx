import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ReactComponent as Address } from "../../../assets/address.svg";
import { markerSeq } from "../../../constants/marker";
import useSchedule from "../../../hooks/useSchdule";
import { placeSearchResult } from "../../../store/placeSearchResult";
import { IKakaoPlaceSearchResult } from "../../../type/kakaoMap";

interface IProps {
  readonly panTo: (placeX: number, placeY: number, index: number) => void;
  readonly placePagination: any;
  readonly recommendStatus: boolean;
}

const PlaceSearchLists = ({
  panTo,
  placePagination,
  recommendStatus,
}: IProps) => {
  const [placeLists, setPlaceLists] = useRecoilState(placeSearchResult);
  const [pagination, setPagination] = useState<number[]>([]);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const { addDestination } = useSchedule();
  const isExist = placeLists.length !== 0;

  const setPage = () => {
    const pages = [];
    for (let i = 1; i <= placePagination.last; i++) {
      pages.push(i);
    }
    setPagination(pages);
  };

  const onClickAddPlaceHandler = (place: IKakaoPlaceSearchResult) => {
    addDestination({
      placeName: place.placeName,
      addressName: place.addressName,
      y: Number(place.y),
      x: Number(place.x),
    });
  };

  const onClickPageHandler = (page: number) => {
    placePagination.gotoPage(page);
    setSelectedPage(page);
  };

  useEffect(() => {
    setPlaceLists([]);
  }, []);

  useEffect(() => {
    if (placePagination !== undefined) {
      setPage();
    }
  }, [placePagination]);

  return (
    <div
      id="menu_wrap"
      className="grow bg-gray-007"
    >
      <h3 className="flex mt-6 ml-4 font-DoHyeon font-normal text-2xl">
        <span className="mr-2">
          <Address
            width={25}
            height={25}
          />
        </span>
        검색결과
      </h3>
      <div
        className={`${
          recommendStatus ? "h-[17rem]" : "h-[calc(100vh-15rem-10rem)]"
        } overflow-y-auto`}
      >
        {isExist ? (
          <ul id="placesList">
            {placeLists.map((place: IKakaoPlaceSearchResult, index) => (
              <li
                key={place.id}
                className={`flex my-3 py-4 h-[8rem] bg-white hover:bg-gray-006 border-b border-b-gray-004 shadow-sm cursor-pointer ${
                  index === 0 && "border-t border-t-gray-004"
                }`}
              >
                <div
                  onClick={() => panTo(Number(place.y), Number(place.x), index)}
                >
                  <div className="ml-4 w-[17em]">
                    <div className="mb-1">
                      <p className="w-[17rem] font-medium text-lg text-black-002 truncate ">
                        <span className="mr-2 font-bold text-blue-001">
                          {markerSeq[index]}
                        </span>
                        {place.placeName}
                      </p>
                    </div>
                    <p className="font-normal text-sm">{place.addressName}</p>
                    <p className="font-normal text-sm text-black-003">
                      {place.phone}
                    </p>
                    <a
                      className="font-normal text-[0.8rem] font-extralight text-blue-001 hover:text-blue-005"
                      href={`https://place.map.kakao.com/${place.id}`}
                      target="_blank"
                    >
                      상세보기
                    </a>
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
      </div>
      <div
        id="pagination"
        className="flex justify-center items-center pt-4"
      >
        {pagination !== undefined &&
          pagination.map((page) => (
            <div
              key={page}
              className={`px-3 py-1 text-xl hover:bg-gray-003 rounded-md ${
                selectedPage === page && "border border-blue-003 text-blue-001 "
              } cursor-pointer`}
              onClick={() => onClickPageHandler(page)}
            >
              {page}
            </div>
          ))}
      </div>
    </div>
  );
};

export default PlaceSearchLists;
