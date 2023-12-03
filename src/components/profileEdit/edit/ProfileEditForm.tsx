import { ChangeEvent, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { getMemberByAccessToken } from "../../../api/memberAPI";
import {
  checkNicknameDuplication,
  getProfile,
  updateProfileImageAPI,
  updateProfileInfo,
} from "../../../api/profileAPI";
import { ReactComponent as ProfileImage } from "../../../assets/smile.svg";

interface IIsAvailableNickname {
  isAvailable: boolean;
  message: string;
}

const ProfileEditForm = () => {
  const MAX_DESCRIPTION_LENGTH = 200;
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [isCheckNickname, setIsCheckNickname] = useState<boolean>(true);
  const [isAvailableNickname, setIsAvailableNickname] =
    useState<IIsAvailableNickname>({
      isAvailable: false,
      message: "",
    });
  const [preview, setPreview] = useState<string>("");
  const [memberInfo, setMemberInfo] = useState({
    nickname: "",
    img: "",
    email: "",
    description: "",
  });
  const nicknameRef = useRef<HTMLInputElement>(null);
  const introduceRef = useRef<HTMLTextAreaElement>(null);

  const isExistImage = memberInfo.img === "default" && preview === "";

  const fetchMemberInfo = async () => {
    const data = await getMemberByAccessToken();
    const userProfile = await getProfile(data.memberId);
    setMemberInfo({
      nickname: userProfile.nickname,
      img: userProfile.img,
      email: userProfile.loginEmail,
      description: userProfile.description,
    });
    if (userProfile.description) {
      setDescriptionLength(userProfile.description.length);
    }
  };

  const onChangeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files?.length !== 0) {
      setPreview(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const onClickUpdateImgHandler = async () => {
    if (image) {
      const formData = new FormData();
      formData.append("file", image);

      const result = await updateProfileImageAPI(formData);

      if (result?.status === 200) {
        Swal.fire({
          icon: "success",
          text: "이미지가 수정되었습니다.",
        });
        fetchMemberInfo();
      }
    } else {
      const result = await updateProfileImageAPI(new FormData());

      if (result?.status === 200) {
        Swal.fire({
          icon: "success",
          text: "기본 이미지로 설정되었습니다.",
        });
        fetchMemberInfo();
      }
    }
  };

  const onClickDeleteImgHandler = () => {
    const input = document.getElementById("profileImage") as HTMLInputElement;
    if (input) {
      input.value = "";
    }

    setMemberInfo({ ...memberInfo, img: "default" });
    setImage(null);
    setPreview("");
  };

  const onChangeNicknameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === memberInfo.nickname) {
      setIsCheckNickname(true);
    } else {
      setIsCheckNickname(false);
    }
  };

  const onClickCheckNicknameHandler = async () => {
    const nickname = nicknameRef.current?.value as string;

    if (nickname.length < 2 || nickname.length > 10) {
      setIsAvailableNickname({
        isAvailable: false,
        message: "닉네임은 2자 이상 10자 이하로 작성해주세요.",
      });
      return;
    }

    const result = await checkNicknameDuplication(nickname);

    if (!result) {
      setIsCheckNickname(true);
      setIsAvailableNickname({
        isAvailable: true,
        message: "사용 가능한 닉네임 입니다.",
      });
    } else {
      setIsCheckNickname(false);
      setIsAvailableNickname({
        isAvailable: false,
        message: "중복된 닉네임입니다.",
      });
    }
  };

  const validationCheck = (nickname: string, introduce: string) => {
    if (!isCheckNickname) {
      Swal.fire({
        icon: "error",
        text: "닉네임 중복확인은 필수입니다.",
      });
      return false;
    }

    if (nickname?.length === 0) {
      Swal.fire({
        icon: "error",
        text: "닉네임 입력은 필수입니다.",
      });
      return false;
    }

    if (
      nickname === memberInfo.nickname &&
      introduce === memberInfo.description
    ) {
      Swal.fire({
        icon: "error",
        text: "변경된 정보가 없습니다.",
      });
      return false;
    }

    return true;
  };

  const onChangeIntroduceHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionLength(e.target.value.length);
  };

  const onSubmitHandler = async () => {
    const nickname = nicknameRef.current?.value as string;
    const introduce = introduceRef.current?.value as string;

    if (nickname && introduce && !validationCheck(nickname, introduce)) {
      return;
    }

    const result = await updateProfileInfo(nickname, introduce);

    if (result?.status === 200) {
      Swal.fire({
        icon: "success",
        text: "회원정보가 수정되었습니다.",
      });
      fetchMemberInfo();
    }
  };

  useEffect(() => {
    fetchMemberInfo();
  }, []);

  return (
    <section className="m-center w-full">
      <div className="my-16 ">
        <form className="flex flex-col items-center m-center sm:w-96">
          <div className="relative m-center sm:w-[12.5rem] sm:h-[12.5rem] w-[9rem] h-[9rem]">
            <label
              htmlFor="profileImage"
              className="flex justify-center cursor-pointer hover:opacity-25"
            >
              {isExistImage ? (
                <ProfileImage className="sm:w-[200px] sm:h-[200px] w-[130px] h-[130px]" />
              ) : (
                <img
                  src={preview === "" ? memberInfo.img : preview}
                  alt="profile"
                  className="sm:w-[200px] sm:h-[200px] w-[130px] h-[130px] rounded-full border object-contain border-gray-004"
                />
              )}
              <input
                type="file"
                id="profileImage"
                className="hidden"
                onChange={onChangeImageHandler}
              />
            </label>
            {(preview !== "" || memberInfo.img !== "default") && (
              <button
                type="button"
                className="absolute top-0 right-5 px-2 py-1 bg-red-001 hover:bg-[#F84D4D] rounded-md text-white text-[0.7rem]"
                onClick={onClickDeleteImgHandler}
              >
                삭제
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={onClickUpdateImgHandler}
            className="mt-4 mx-auto sm:w-[18rem] sm:h-[3.2rem] w-[14rem] h-[2.8rem] bg-blue-002 hover:bg-blue-001 rounded-md sm:text-base text-sm text-white font-bold"
          >
            이미지 수정
          </button>

          <div className="flex flex-col mt-8 sm:w-[18rem] w-[14rem]">
            <div className="flex flex-col">
              <label
                htmlFor="nickname"
                className="block mt-12 font-bold sm:text-lg text-base"
              >
                닉네임
              </label>
              <input
                type="text"
                id="nickname"
                defaultValue={memberInfo.nickname}
                className="mt-2 px-4 py-2 border-gray-003 border rounded-md outline-none"
                onChange={onChangeNicknameHandler}
                ref={nicknameRef}
              />
              <p
                className={`text-sm ${
                  isAvailableNickname.isAvailable
                    ? "text-blue-001"
                    : "text-red-001"
                }`}
              >
                {isAvailableNickname.message}
              </p>
              <button
                type="button"
                className="mt-4 mx-auto w-[14rem] h-[2.8rem] sm:w-[18rem] sm:h-[3.2rem] bg-platinum-001 hover:bg-platinum-002 rounded-md text-white font-bold"
                onClick={onClickCheckNicknameHandler}
              >
                중복확인
              </button>
            </div>
            <div className="flex flex-col mt-6">
              <label
                htmlFor="email"
                className="font-bold sm:text-lg text-base"
              >
                이메일
              </label>
              <input
                type="text"
                id="email"
                defaultValue={memberInfo.email}
                disabled
                className="mt-2 px-4 py-2 border-gray-003 border-gray-002 border rounded-md outline-none text-gray-002"
              />
            </div>
            <div className="flex flex-col mt-6">
              <label
                htmlFor="introduce"
                className="block font-bold sm:text-lg text-base"
              >
                내 소개
              </label>
              <textarea
                id="introduce"
                className="mt-2 px-4 py-2 h-40 border-gray-003 border-gray-002 border rounded-md outline-none resize-none"
                defaultValue={memberInfo.description}
                onChange={onChangeIntroduceHandler}
                ref={introduceRef}
                maxLength={MAX_DESCRIPTION_LENGTH}
              />
              <div className="place-self-end text-gray-002">
                {descriptionLength}/{MAX_DESCRIPTION_LENGTH}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onSubmitHandler}
            className="mt-4 mx-auto w-[14rem] h-[2.8rem] sm:w-[18rem] sm:h-[3.2rem] bg-orange-001 hover:bg-orange-002 rounded-md text-white font-bold"
          >
            회원정보 수정
          </button>
        </form>
      </div>
    </section>
  );
};

export default ProfileEditForm;
