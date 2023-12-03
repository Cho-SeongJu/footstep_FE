import moment from "moment";
import { ICreateShareRoomFormValue } from "../type/planShareRoom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const formValidationCheck = (form: ICreateShareRoomFormValue) => {
  let checkResult = false;
  let msg = "";
  const today = moment(new Date()).format("YYYY-MM-DD");

  if (form.title.length === 0) {
    msg = "제목 입력은 필수입니다.";
  } else if (form.title.length > 20) {
    msg = "제목은 20자리 이하 까지 입력 가능합니다.";
  } else if (form.startDate.length === 0 || form.endDate.length === 0) {
    msg = "여행 일자 선택을 필수입니다.";
  } else if (form.startDate < today || form.endDate < today) {
    msg = "오늘보다 이전 일자는 선택할 수 없습니다.";
  } else {
    checkResult = true;
  }

  if (!checkResult) {
    MySwal.fire({
      icon: "error",
      text: msg,
    });
  }

  return checkResult;
};
