import { useState } from "react";
import Swal from "sweetalert2";
import { likePostAPI, unlikePostAPI } from "../../../api/postAPI";
import { ReactComponent as HeartFill } from "../../../assets/heartFill.svg";
import { ReactComponent as Heart } from "../../../assets/heartNoFill.svg";
import { ILikeProps } from "../../../type/communityPage";
import { getCookie } from "../../../utils/cookie";

const Like = ({ isLiked, communityId, initialLikeCount }: ILikeProps) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [liked, setLiked] = useState<boolean>(isLiked);

  const handleLike = async () => {
    const KEY = "accessToken";
    const token = getCookie(KEY);

    if (!token) {
      Swal.fire({
        title: "로그인 후 이용 가능합니다.",
        icon: "info",
        confirmButtonText: "확인",
      });
      return;
    }

    if (liked) {
      await unlikePostAPI(communityId);
      setLikeCount(likeCount - 1);
      setLiked(false);
    } else {
      await likePostAPI(communityId);
      setLikeCount(likeCount + 1);
      setLiked(true);
    }
  };

  return (
    <div className="flex items-center">
      <button
        className={`mr-2 focus:outline-none ${liked ? "animate-jump" : ""}`}
        onClick={handleLike}
      >
        {liked ? (
          <HeartFill
            width={20}
            height={20}
            className="text-red-001"
          />
        ) : (
          <Heart
            width={20}
            height={20}
            className="text-black-002"
          />
        )}
      </button>
      <p className="flex items-center text-lg font-bold text-black-002">
        좋아요 <span className="ml-2 font-bold text-red-001">{likeCount}</span>
      </p>
    </div>
  );
};

export default Like;
