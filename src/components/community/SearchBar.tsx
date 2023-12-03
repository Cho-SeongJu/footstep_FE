import { ChangeEvent, FormEvent, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { getCommunityAPI } from "../../api/communityAPI";
import { ReactComponent as BottomArrow } from "../../assets/bottomArrow.svg";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { condition } from "../../state/condition";
import { postList } from "../../store/postList";

const SearchBar = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [selectedCondition, setSelectedCondition] = useRecoilState(condition);
  const [openCondition, setOpenCondition] = useState<boolean>(false);
  const setPosts = useSetRecoilState(postList);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const onChangeOpenConditionHandler = () => {
    setOpenCondition(!openCondition);
  };

  const onChangeConditionHandler = (type: string) => {
    setSelectedCondition({ ...selectedCondition, type });
    setOpenCondition(false);
  };

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const condition = {
      keyword,
      type: selectedCondition.type,
      sort: selectedCondition.sort,
      page: 1,
      size: 10,
    };

    setSelectedCondition({ ...selectedCondition, keyword });
    const response = await getCommunityAPI(condition);
    setPosts(response);
  };

  return (
    <div className="relative flex items-center rounded-l-md sm:w-auto">
      <div
        className="flex cursor-pointer rounded-l-md bg-white hover:bg-gray-003"
        onClick={onChangeOpenConditionHandler}
      >
        <p className="flex justify-center items-center pl-2 py-2 w-[4rem] h-[3rem] text-sm rounded-l-md hover:text-white ">
          {selectedCondition.type === "title" ? "제목" : "닉네임"}
        </p>
        <div className="flex items-center border-r border-gray-003">
          <BottomArrow
            width={30}
            height={30}
          />
        </div>
      </div>
      <ul
        className={`${
          !openCondition ? "hidden" : "block"
        } absolute top-[4.6rem] w-[5.9rem] border border-gray-003 bg-white rounded-md`}
      >
        <li
          className="flex justify-center py-3 text-sm border-b border-gray-003 cursor-pointer hover:bg-gray-003 hover:text-white"
          onClick={() => onChangeConditionHandler("title")}
        >
          제목
        </li>
        <li
          className="flex justify-center py-3 text-sm cursor-pointer hover:bg-gray-004 hover:text-white"
          onClick={() => onChangeConditionHandler("nickname")}
        >
          닉네임
        </li>
      </ul>
      <div className="flex py-3">
        <form className="flex py-3">
          <input
            type="text"
            onChange={handleInputChange}
            placeholder="검색어를 입력하세요"
            className="pl-4 py-2 md:w-[20rem] sm:w-[13rem] w-[9rem] h-[3rem] outline-none placeholder:text-sm sm:w-auto"
          />
          <button
            type="submit"
            onClick={onSubmitHandler}
            className="flex items-center px-2 py-2 h-[3rem] bg-white rounded-r-md"
          >
            <SearchIcon className="w-[25px] h-[25px] fill-gray-001" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
