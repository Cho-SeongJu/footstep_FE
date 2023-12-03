import Swal from "sweetalert2";
import { deletePostAPI } from "../../../api/postAPI";
import { useNavigate } from "react-router-dom";

const PostEditDelete = ({ postId }: { postId: number }) => {
  const navigate = useNavigate();

  const handleUpdate = async () => {
    navigate(`/community/${postId}/edit`);
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "게시글을 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "예",
      cancelButtonText: "아니오",
    });

    if (result.isConfirmed) {
      try {
        await deletePostAPI(postId);
        navigate("/community");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex">
      <button
        className="absolute right-[106px] p-1 min-w-max h-[35px] text-gray-001"
        onClick={handleUpdate}
      >
        수정
      </button>
      <button
        className="absolute right-[60px] p-1 min-w-max h-[35px] text-gray-001"
        onClick={handleDelete}
      >
        삭제
      </button>
    </div>
  );
};

export default PostEditDelete;
