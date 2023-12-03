import { ChangeEvent, FormEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import { getShareRoomAPI } from "../../../api/shareRoomAPI";
import { searchShareRoomData } from "../../../store/searchShareRoom";

const SearchCodeBar = () => {
  const [shareCode, setShareCode] = useState<string>("");
  const setSearchShareRoomData = useSetRecoilState(searchShareRoomData);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setShareCode(e.target.value);
  };

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const result = await getShareRoomAPI(shareCode);

    if (result) {
      setSearchShareRoomData(result?.data);
    }
  };

  return (
    <div className="w-full h-64 bg-sky-005">
      <div className="mx-auto pt-14">
        <div className="flex flex-col sm:flex-row justify-center items-center m-center text-white sm:text-xl text-lg  font-bold">
          <p className="mx-1">친구들과 자유롭게 계획하는</p>
          <p className="mx-1">실시간 여행 일정 계획 플랫폼, 발자국</p>
        </div>
        <form
          method="GET"
          onSubmit={onSubmitHandler}
        >
          <input
            type="text"
            placeholder="초대코드를 8자리를 입력하고 enter키를 눌러주세요 !"
            maxLength={8}
            className="block m-center px-6 mt-6 w-[17rem] lg:w-[45rem] sm:w-[35rem] sm:h-[6rem] h-[4rem] text-[0.5rem] sm:text-base bg-white rounded-2xl outline-none"
            onChange={onChangeHandler}
          />
        </form>
      </div>
    </div>
  );
};

export default SearchCodeBar;
