import { useRecoilValue } from "recoil";
import { ReactComponent as Exit } from "../../../assets/exit.svg";
import { shareRoomInfo } from "../../../store/shareRoomInfo";
import Calendar from "../../common/calendar/Calendar";
import { useEffect, useState } from "react";
import { editShareRoomInfoAPI } from "../../../api/shareRoomAPI";
import { useParams } from "react-router-dom";
import { jwtAccessTokenState } from "../../../state/loginState";
import useTitle from "../../../hooks/useTitle";
import { createShareRoomForm } from "../../../store/createShareRoomForm";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ScheduleAreaHeader = () => {
  const token = useRecoilValue(jwtAccessTokenState);
  const getShareRoomInfo = useRecoilValue(shareRoomInfo);
  const shareRoomForm = useRecoilValue(createShareRoomForm);
  const { shareRoomID } = useParams<string>();
  const [editStatus, setEditStatus] = useState<boolean>(false);
  const [title, onChangeTitleHandler, setTitleHandler] = useTitle();
  
  const MySwal = withReactContent(Swal);

  const type = "get";

  const onClickHandler = async (type: string) => {
    switch(type) {
      case "cancel":
        setEditStatus(false);
        break;
      case "edit" :
        setEditStatus(true);
        break;
      case "complete" :
        if(shareRoomID) {
          const result = await editShareRoomInfoAPI(shareRoomID, token, shareRoomForm);

          if(result === 200){
            MySwal.fire({
              icon: "success",
              text: "수정이 성공적으로 되었습니다",
            });
            setEditStatus(false);
          }
        }
    }
  }

  useEffect(() => {
    setTitleHandler(getShareRoomInfo.shareName);
  }, [getShareRoomInfo])

  return (
    <div className="w-planShareRoomSideBar h-planShareRoomHeader bg-blue-003">
      <div className="flex justify-between items-center">
        <button type="button" className="mt-4 mb-6 ml-2  ">
          <Exit fill="#A5A5A5" width={25} height={25} />
        </button>
        {editStatus ? (
          <div className="flex mr-4 text-white text-sm">
            <p 
              className="mx-1 cursor-pointer"
              onClick={() => onClickHandler("complete")}>
              수정
            </p>
            <p className="mx-1 cursor-pointer" onClick={() => onClickHandler("cancel")}>취소</p>
          </div>
           ): (
          <p className="mr-4 text-white text-sm cursor-pointer" onClick={() => onClickHandler("edit")}>
            편집
          </p>
          )
        }
      </div>
      <div className="ml-12">
        <input 
          type="text"
          defaultValue={title}
          className="w-[16rem] bg-blue-003 text-white text-2xl font-bold"
          onChange={onChangeTitleHandler}
          disabled={editStatus ? false : true} 
          />
        <Calendar type={type} editStatus={editStatus}/>
      </div>
    </div>
  );
};

export default ScheduleAreaHeader;
