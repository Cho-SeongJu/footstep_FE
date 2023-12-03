import { ChangeEvent, FormEvent, useState } from "react";
import { useRecoilValue } from "recoil";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ReactComponent as SearchIcon } from "../../../assets/search.svg";
import { selectedArea } from "../../../state/selectedArea";
import { IPropsPlaceSearch } from "../../../type/planShareRoom";

const PlaceSearchBar = ({ placeSearch }: IPropsPlaceSearch) => {
  const selected = useRecoilValue(selectedArea);
  const [keyword, setKeyword] = useState<string>("");
  const MySwal = withReactContent(Swal);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (selected === "noSelected") {
      MySwal.fire({
        icon: "error",
        text: "지역 선택 후 장소 검색을 해주세요",
      });
      return;
    }

    placeSearch(keyword);
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex justify-center items-center mt-6 mx-auto w-[20rem] h-[4rem] bg-white border border-gray-004 rounded-sm shadow-sm"
    >
      <input
        type="text"
        placeholder="장소, 주소 검색"
        className="grow pl-4 py-3 outline-none text-sm placeholder:text-sm"
        onChange={onChangeHandler}
      />
      <SearchIcon
        className="mx-4 w-[18px] h-[18px]"
        fill="#00CDFF"
      />
    </form>
  );
};

export default PlaceSearchBar;
