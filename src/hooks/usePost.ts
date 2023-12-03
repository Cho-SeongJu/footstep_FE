import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ICommunityPost } from "../type/communityPage";
import { getPostAPI } from "../api/postAPI";

export const usePost = () => {
  const [post, setPost] = useState<ICommunityPost | null>(null);
  const { communityId } = useParams<{ communityId: string }>();

  const onCommentsChange = async () => {
    if (!communityId) return;
    const data = await getPostAPI(Number(communityId));
    setPost(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!communityId) return;

      try {
        const data = await getPostAPI(Number(communityId));
        setPost(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [communityId]);

  return { post, onCommentsChange };
};
