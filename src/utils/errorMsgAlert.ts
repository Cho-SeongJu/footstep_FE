import Swal from "sweetalert2";

export const errorMsg = (errorCode: string) => {
  switch (errorCode) {
    case "ALREADY_DESTINATION":
      Swal.fire({
        icon: "error",
        text: "이미 등록된 목적지 입니다.",
      });
      break;

    case "NOT_FIND_DESTINATION_ID":
      Swal.fire({
        icon: "error",
        text: "존재하지 않는 목적지 입니다.",
      });
      break;

    case "NOT_FIND_SHARE_ID":
      Swal.fire({
        icon: "error",
        text: "존재하지 않는 공유방 입니다.",
      });
      break;

    case "NOT_FIND_MEMBER_ID":
      Swal.fire({
        icon: "error",
        text: "존재하지 않는 회원 아이디입니다.",
      });
      break;

    case "NOT_MATCH_CREATE_MEMBER":
      Swal.fire({
        icon: "error",
        text: "공유방 생성자가 아닙니다.",
      });
      `  `;
      break;

    case "WRONG_MEMBER_PASSWORD":
      Swal.fire({
        icon: "error",
        text: "아이디나 비밀번호가 일치하지 않습니다.",
      });
      break;

    case "ALREADY_DELETED_MEMBER":
      Swal.fire({
        icon: "error",
        text: "존재하지 않은 회원입니다.",
      });
      break;

    default:
      Swal.fire({
        icon: "error",
        text: "처리 중 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요",
      });
      break;
  }
};
