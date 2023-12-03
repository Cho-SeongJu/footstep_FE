import { useState } from "react";
import { ReactComponent as BottomArrow } from "../../assets/bottomArrow.svg";
import { condition } from "../../state/condition";
import { useRecoilState, useSetRecoilState } from "recoil";
import { getCommunityAPI } from "../../api/communityAPI";
import { postList } from "../../store/postList";

const SortButtons = () => {
  const [openSort, setOpenSort] = useState<boolean>(false);
  const [selectedSortCondition, setSelectedSortCondition] =
    useRecoilState(condition);
  const setPosts = useSetRecoilState(postList);
  const onClickOpenSortHandler = () => {
    setOpenSort(!openSort);
  };

  const onClickSelectedHandler = async (sort: string) => {
    setSelectedSortCondition({ ...selectedSortCondition, sort });
    setOpenSort(false);

    const resendData = {
      keyword: selectedSortCondition.keyword,
      type: selectedSortCondition.type,
      sort,
      size: 10,
      page: 1,
    };

    const response = await getCommunityAPI(resendData);
    setPosts(response);
  };

  return (
    <div className="relative sm:ml-12 sm:mr-12 md:ml-12 rounded-md">
      <div
        className="flex rounded-md bg-white hover:bg-sky-001  hover:text-white cursor-pointer"
        onClick={onClickOpenSortHandler}
      >
        <p className="flex justify-center items-center w-[4rem] h-[3rem] rounded-l-md text-sm font-bold">
          {selectedSortCondition.sort === "recent" ? "최신순" : "인기순"}
        </p>
        <div className="flex items-center border-r border-gray-003 rounded-r-md">
          <BottomArrow width={30} height={30} />
        </div>
      </div>
      <ul
        className={`absolute top-[3.1rem] cursor-pointer w-[5.9rem] bg-white border border-gray-003 rounded-md text-sm ${
          !openSort ? "hidden" : "block"
        }`}
      >
        <li
          className="py-3 flex justify-center border-b border-gray-003 hover:bg-gray-003 hover:text-white"
          onClick={() => onClickSelectedHandler("recent")}
        >
          최신순
        </li>
        <li
          className="py-3 flex justify-center hover:bg-gray-003 hover:text-white"
          onClick={() => onClickSelectedHandler("like")}
        >
          인기순
        </li>
      </ul>
    </div>
  );
};

export default SortButtons;
