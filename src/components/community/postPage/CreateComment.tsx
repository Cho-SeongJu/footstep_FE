import { useState, useEffect } from "react";
import { createComment } from "../../../api/communityAPI";
import { ICommunityPost } from "../../../type/communityPage";
import { getCurrentUserMemberId } from "../../../api/memberAPI";
import Swal from "sweetalert2";

interface CreateCommentProps {
  onCommentsChange: () => void;
  post: ICommunityPost;
}

const CreateComment = ({ onCommentsChange, post }: CreateCommentProps) => {
  const [content, setContent] = useState("");
  const [memberId, setMemberId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetchMemberId = async () => {
      try {
        const memberId = await getCurrentUserMemberId();
        setMemberId(memberId);
      } catch (error) {
        alert(error);
      }
    };

    fetchMemberId();
  }, []);

  const handleCreate = async () => {
    if (!content.trim()) {
      Swal.fire({
        title: "댓글 내용을 입력해주세요",
        icon: "info",
        confirmButtonText: "확인",
      });
      return;
    }

    const result = await Swal.fire({
      title: "댓글을 작성하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "예",
      cancelButtonText: "아니오",
    });

    if (result.isConfirmed && memberId && post) {
      try {
        await createComment(
          { content, communityId: post.communityId },
          memberId
        );
        onCommentsChange();
        setContent("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (!memberId) return null;

  return (
    <div className="flex items-center mt-2 mb-20 border border-gray-003 rounded-lg">
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="px-4 py-3 w-full rounded-l-lg outline-none placeholder:text-sm"
        placeholder="댓글을 입력해주세요   :)"
      />
      <button
        onClick={handleCreate}
        className="px-2 py-3 min-w-max rounded-r-lg text-gray-001 transition-all duration-250"
      >
        입력
      </button>
    </div>
  );
};

export default CreateComment;
