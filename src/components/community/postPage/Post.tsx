import { usePost } from "../../../hooks/usePost";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import Like from "./Like";
import { useEffect, useState } from "react";
import { getCurrentUserMemberId } from "../../../api/memberAPI";
import PostEditDelete from "./PostEditDelete";
import moment from "moment";

const Post = () => {
  const { post, onCommentsChange } = usePost();
  const [memberId, setMemberId] = useState<number | undefined>(undefined);
  const [createDate, setCreateDate] = useState<string>("");

  useEffect(() => {
    const fetchMemberId = async () => {
      try {
        const memberId = await getCurrentUserMemberId();
        setMemberId(memberId);
      } catch (error) {
        // console.error(error);
      }
    };

    fetchMemberId();
  }, []);

  useEffect(() => {
    if (post) {
      const date = new Date(post?.createdDate);
      const newDate = moment(date).format("YYYY년 MM월 DD일");
      setCreateDate(newDate);
    }
  }, [post]);

  if (!post) {
    return (
      <div className="flex justify-center items-center w-full h-screen bg-gray-005">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative mx-auto md:w-[55rem] min-h-screen p-2 md:p-8 animate-sparkle">
      {post.memberId === memberId && (
        <div className="mx-auto w-[55rem]">
          <PostEditDelete postId={post.communityId} />
        </div>
      )}
      <div className="p-8 rounded-lg bg-white-001">
        <h2 className="mb-4 pb-4 w-full border-b-2 text-4xl font-bold text-blue-003 truncate">
          {post.communityName}
        </h2>
        <p className="flex items-center mb-2 text-black-002 text-sm">
          작성자 : <span className="ml-2 font-bold">{post.memberNickname}</span>
        </p>
        <p className="flex items-center text-sm">
          작성일 : <span className="ml-2 text-gray-001">{createDate}</span>
        </p>
      </div>
      <div
        className="mb-8 p-6 rounded-md bg-white"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />{" "}
      <div className="p-6 mb-8 rounded-lg bg-white-001">
        <div className="flex justify-between items-center mb-8">
          <p className="flex items-center text-black-002 text-lg font-bold">
            댓글
            <span className="ml-2 text-platinum-001">{post.commentCount}</span>
          </p>
          <Like
            isLiked={post.liked}
            communityId={post.communityId}
            initialLikeCount={post.likeCount}
          />
        </div>

        {post.comments.map((comment) => (
          <Comment
            post={post}
            key={comment.commentId}
            comment={comment}
            onCommentsChange={onCommentsChange}
          />
        ))}
      </div>
      <div className="px-4">
        <CreateComment post={post} onCommentsChange={onCommentsChange} />
      </div>
    </div>
  );
};

export default Post;
