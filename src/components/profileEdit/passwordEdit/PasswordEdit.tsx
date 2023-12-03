import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { changePasswordAPI } from "../../../api/passwordAPI";
import { useNavigate } from "react-router-dom";

interface IFormInputs {
  newPassword: string;
  confirmPassword: string;
}

const formSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required("비밀번호 입력은 필수입니다.")
    .min(8, "비밀번호는 최소 8자 이상 입력해주세요.")
    .max(16, "비밀번호는 최대 16자까지만 입력해주세요.")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/,
      "영문, 숫자, 특수문자를 포함한 8~16자 비밀번호를 입력해주세요."
    ),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("newPassword"), undefined],
      "비밀번호가 일치하지 않습니다."
    ),
});

const PasswordEdit = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInputs>({
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  const { newPassword, confirmPassword } = watch();

  const onSubmit = async (data: IFormInputs) => {
    Swal.fire({
      title: "비밀번호를 변경하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await changePasswordAPI(data);
          Swal.fire(
            "변경 완료!",
            "비밀번호가 성공적으로 변경되었습니다.",
            "success"
          );
          navigate("/user/profile");
        } catch (err) {
          console.error(err);
          Swal.fire(
            "오류 발생!",
            "비밀번호 변경 중 문제가 발생했습니다.",
            "error"
          );
        }
      }
    });
  };

  return (
    <div className="w-full sm:h-[34rem] h-[30rem]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col m-center pt-20 sm:w-[20rem] w-[13rem]"
      >
        <input
          type="password"
          {...register("newPassword")}
          placeholder="새로운 비밀번호"
          className="sm:p-4 p-3 border border-gray-002 rounded-sm outline-none placeholder:text-[0.8rem] md:placeholder:text-sm"
        />
        <p className="text-red-002">{errors.newPassword?.message}</p>
        <input
          type="password"
          {...register("confirmPassword")}
          placeholder="비밀번호 확인"
          className="mt-2 sm:p-4 p-3 border border-gray-002 rounded-sm outline-none placeholder:text-[0.8rem] md:placeholder:text-sm"
        />
        <p className="text-red-002">
          {errors.confirmPassword?.message ||
            (newPassword !== confirmPassword &&
              "비밀번호가 일치하지 않습니다.")}
        </p>
        <p className="text-green-001">
          {newPassword &&
            newPassword == confirmPassword &&
            "비밀번호가 일치합니다."}
        </p>
        <button
          type="submit"
          className="mt-8 sm:h-16 h-12 bg-sky-001 hover:bg-sky-002 rounded-sm text-white sm:text-lg text-sm font-bold"
        >
          비밀번호 변경
        </button>
      </form>
    </div>
  );
};

export default PasswordEdit;
