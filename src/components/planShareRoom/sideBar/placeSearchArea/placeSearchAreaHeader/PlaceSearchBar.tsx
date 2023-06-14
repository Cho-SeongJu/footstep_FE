import { ChangeEvent, FormEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import { ReactComponent as SearchIcon } from "../../../../../assets/search.svg";
import { placeSearch, ps } from "../../../../../api/kakaoAPI";
import { placeSearchResult } from "../../../../../store/placeSearchResult";

const PlaceSearchBar = () => {
  const [keyword, setKeyword] = useState<string>("");
  const setSearchPlaceResult = useSetRecoilState(placeSearchResult);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    placeSearch(keyword, setSearchPlaceResult);
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex justify-center items-center mt-4 mx-auto w-[20rem] h-[3rem] bg-white rounded-sm shadow-lg"
    >
      <input
        type="text"
        placeholder="장소, 주소 검색"
        className="grow pl-4 py-2 outline-none placeholder:text-sm"
        onChange={onChangeHandler}
      />
      <SearchIcon className="mx-4 w-[18px] h-[18px]" fill="#A5A5A5" />
    </form>
  );
};

export default PlaceSearchBar;
