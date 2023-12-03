import { yupResolver } from "@hookform/resolvers/yup";
import { FocusEvent, KeyboardEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { checkEmailDuplication, signUp } from "../api/userSignUp";
import { checkNicknameDuplication } from "../api/profileAPI";
import {
  ICheckEmail,
  ICheckNickname,
  IFormData,
  IGenderType,
} from "../type/signUp";

export const useSignUpForm = () => {
  const [genderType, setGenderType] = useState<IGenderType>({
    gender: "",
    initial: true,
  });
  const [isCheckEmail, setIsCheckEmail] = useState<ICheckEmail>({
    checkEmailMsg: "",
    check: false,
  });
  const [isCheckNickname, setIsCheckNickname] = useState<ICheckNickname>({
    checkNicknameMsg: "",
    check: false,
  });
  const navigate = useNavigate();

  const formSchema = yup.object({
    loginEmailId: yup
      .string()
      .required("이메일 아이디를 입력해주세요.")
      .matches(/[a-z0-9]+/, "이메일 아이디는 영어 소문자와 숫자만 가능합니다."),
    loginEmailDomain: yup
      .string()
      .required("이메일 주소를 선택/입력해주세요.")
      .matches(/^[a-z]+\.[a-z]{2,}$/, "이메일 도메인 형식이 아닙니다."),
    password: yup
      .string()
      .required("비밀번호 입력은 필수입니다.")
      .min(8, "비밀번호는 최소 8자 이상 입력해주세요.")
      .max(16, "비밀번호는 최대 16자까지만 입력해주세요.")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
        "영문, 숫자, 특수문자를 포함한 8~16자 비밀번호를 입력해주세요."
      ),
    checkPassword: yup
      .string()
      .required("비밀번호 확인은 필수입니다.")
      .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다."),
    nickname: yup
      .string()
      .required("닉네임 입력은 필수입니다.")
      .min(2, "닉네임은 최소 2자 이상으로 작성해주세요.")
      .max(10, "닉네임은 최대 10자 이하로 작성해주세요."),
    gender: yup
      .string()
      .required("성별 선택은 필수입니다.")
      .oneOf(["male", "female"], "성별을 선택해주세요."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<IFormData>({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const onClickCheckEmailHandler = async () => {
    const loginEmail = `${getValues().loginEmailId}@${
      getValues().loginEmailDomain
    }`;

    if (
      loginEmail.length === 0 ||
      errors.loginEmailId ||
      errors.loginEmailDomain
    ) {
      return;
    }

    const duplication = await checkEmailDuplication(loginEmail);
    if (duplication) {
      setIsCheckEmail({
        checkEmailMsg: "이미 사용중인 이메일입니다.",
        check: false,
      });
    } else {
      setIsCheckEmail({
        checkEmailMsg: "사용가능한 이메일입니다.",
        check: true,
      });
    }
  };

  const onKeyDownEmailHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Tab") {
      setIsCheckEmail({
        checkEmailMsg: "",
        check: false,
      });
    }
  };

  const onBlurEmailHandler = (e: FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length === 0) {
      setIsCheckEmail({
        ...isCheckEmail,
        checkEmailMsg: "이메일을 입력해주세요.",
      });
      return;
    }

    if (!isCheckEmail.check) {
      setIsCheckEmail({
        ...isCheckEmail,
        checkEmailMsg: "이메일 중복확인은 필수입니다.",
      });
      return;
    }
  };
  useEffect(() => {
    resetEmailDomainHandler();
  }, [watch("loginEmailDomain")]);

  const resetEmailDomainHandler = () => {
    const currentDomain = getValues("loginEmailDomain");
    if (currentDomain === "직접입력") {
      setValue("loginEmailDomain", "");
    }
  };

  const onClickCheckNicknameHandler = async () => {
    const nickname = getValues().nickname;

    if (nickname.length < 2 || nickname.length > 10 || errors.nickname) {
      setIsCheckNickname({
        checkNicknameMsg: "닉네임은 2자 이상 10자 이내로 작성해주세요.",
        check: false,
      });
      return;
    }

    try {
      const response = await checkNicknameDuplication(nickname);

      if (response) {
        setIsCheckNickname({
          checkNicknameMsg: "이미 사용중인 닉네임입니다.",
          check: false,
        });
      } else {
        setIsCheckNickname({
          checkNicknameMsg: "사용 가능한 닉네임입니다.",
          check: true,
        });
      }
    } catch (error: any) {
      if (error.response.status === 500) {
        setIsCheckNickname({
          checkNicknameMsg:
            "서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.",
          check: false,
        });
      }
    }
  };

  const onKeyDownNicknameHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Tab") {
      setIsCheckNickname({
        checkNicknameMsg: "",
        check: false,
      });
    }
  };

  const onBlurNicknameHandler = (e: FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length === 0) {
      setIsCheckNickname({
        ...isCheckNickname,
        checkNicknameMsg: "닉네임 입력은 필수입니다.",
      });
      return;
    }

    if (!isCheckNickname.check) {
      setIsCheckNickname({
        ...isCheckNickname,
        checkNicknameMsg: "닉네임 중복확인은 필수입니다.",
      });
      return;
    }
  };

  const onClickGenderHandler = (gender: string) => {
    setGenderType({
      gender,
      initial: false,
    });

    setValue("gender", gender);
  };

  const onSubmitHandler = async () => {
    if (!isCheckEmail.check) {
      setIsCheckEmail({
        ...isCheckEmail,
        checkEmailMsg: "이메일 중복확인은 필수입니다.",
      });
      return;
    }

    const signUpForm = {
      loginEmail: `${getValues().loginEmailId}@${getValues().loginEmailDomain}`,
      password: getValues().password,
      nickname: getValues().nickname,
      gender: getValues().gender,
    };

    const response = await signUp(signUpForm);

    if (response.status === 200) {
      navigate("/user/welcome");
    }
  };

  return {
    register,
    errors,
    isCheckEmail,
    genderType,
    handleSubmit,
    onSubmitHandler,
    onClickGenderHandler,
    onClickCheckEmailHandler,
    onKeyDownEmailHandler,
    onBlurEmailHandler,
    onClickCheckNicknameHandler,
    onKeyDownNicknameHandler,
    onBlurNicknameHandler,
    isCheckNickname,
    setValue,
    watch,
    resetEmailDomainHandler,
  };
};
