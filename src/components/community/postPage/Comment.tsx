import { useState, useEffect } from "react";
import { deleteComment, updateComment } from "../../../api/communityAPI";
import { IComment, ICommunityPost } from "../../../type/communityPage";
import { getCurrentUserMemberId } from "../../../api/memberAPI";
import Swal from "sweetalert2";

interface CommentProps {
  comment?: IComment;
  onCommentsChange: () => void;
  post: ICommunityPost;
}

const Comment = ({ comment, onCommentsChange }: CommentProps) => {
  const [isEditMode, setEditMode] = useState(!comment);
  const [content, setContent] = useState(comment?.content || "");
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

  const handleUpdate = async () => {
    if (comment?.commentId && memberId === comment.memberId) {
      const result = await Swal.fire({
        title: "댓글을 수정하시겠습니까?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "예",
        cancelButtonText: "아니오",
      });

      if (result.isConfirmed) {
        try {
          await updateComment(comment.commentId, { content });
          onCommentsChange();
          setEditMode(false);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  const handleDelete = async () => {
    if (comment?.commentId && memberId === comment.memberId) {
      const result = await Swal.fire({
        title: "댓글을 삭제하시겠습니까?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "예",
        cancelButtonText: "아니오",
      });

      if (result.isConfirmed) {
        try {
          await deleteComment(comment.commentId);
          onCommentsChange();
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <>
      <div className="py-4 border-b border-gray-004">
        <p className="font-bold text-black-002">{comment?.memberNickname}</p>
        <div className="my-2">
          {isEditMode ? (
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border rounded px-2 py-1 w-full"
            />
          ) : (
            <p className="text-md">{content}</p>
          )}
          {memberId === comment?.memberId && (
            <div className="flex justify-end mt-2">
              {isEditMode ? (
                <button
                  onClick={handleUpdate}
                  className="bg-blue-003 text-white-001 px-2 py-1 rounded mr-2 hover:bg-blue-002 transition-all duration-250"
                >
                  저장
                </button>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="p-1 text-sm text-gray-001"
                >
                  수정
                </button>
              )}
              <button
                onClick={handleDelete}
                className="p-1 text-sm text-gray-001"
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Comment;
