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

  // p4mQLV4n
  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const result = await getShareRoomAPI(shareCode);
    setSearchShareRoomData(result.data);
  };

  return (
    <div className="w-full h-52 bg-main-color">
      <div className="mx-auto pt-10 w-[55rem]">
        <p className="m-center w-[31rem] text-white text-lg font-bold">
          친구들과 자유롭게 계획하는 실시간 여행 일정 계획 플랫폼, 발자국
        </p>
        <form method="GET" onSubmit={onSubmitHandler}>
          <input
            type="text"
            placeholder="초대코드를 8자리를 입력해주세요. ex) 000000"
            maxLength={8}
            className="block m-center px-8 mt-4 w-[45rem] h-[5rem] bg-white rounded-3xl outline-none"
            onChange={onChangeHandler}
          />
        </form>
      </div>
    </div>
  );
};

export default SearchCodeBar;
