import { useState, useEffect, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as NoProfile } from "../../assets/smile.svg";
import { ReactComponent as Like } from "../../assets/like.svg";
import { getCommunityAPI } from "../../api/communityAPI";
import {
  ICommunityData,
  ICommunityPost,
  IListsProps,
} from "../../type/communityPage";
import { getCookie } from "../../utils/cookie";
import Swal from "sweetalert2";
import Pagination from "./Pagination";
import { getCurrentUserNickname } from "../../api/memberAPI";
import SortButtons from "./SortButtons";

const Lists = ({ searchQuery }: IListsProps) => {
  const [sortBy, setSortBy] = useState<"recent" | "like">("recent");
  const [posts, setPosts] = useState<ICommunityPost[]>([]);
  const [page, setPage] = useState<number>(0);
  const [lastPage, setLastPage] = useState<boolean>(false);
  const [privatePosts, setPrivatePosts] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [showPrivate, setShowPrivate] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const nickname = await getCurrentUserNickname();
      setCurrentUser(nickname);
      try {
        const data: ICommunityData = await getCommunityAPI({
          page,
          size: 5,
          sort: sortBy,
        });

        let filteredPosts = data.communities;

        // 체크박스가 체크된 상태이면, 비공개 게시글과 현재 유저가 작성한 게시글만 필터링
        if (privatePosts && currentUser) {
          filteredPosts = filteredPosts.filter(
            (post) =>
              !post.communityPublicState && post.memberNickname === currentUser
          );
        } else {
          filteredPosts = filteredPosts.filter(
            (post) => post.communityPublicState
          );
        }

        setPosts(filteredPosts);
        setLastPage(data.lastPage);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [sortBy, page, privatePosts, currentUser]);

  // 검색어로 게시글 필터링
  const filteredPosts: ICommunityPost[] = posts.filter((post) => {
    const matchSearchQuery: boolean = post.communityName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchSearchQuery;
  });

  const handlePrivatePostsToggle = () => {
    setShowPrivate(!showPrivate);
    setPrivatePosts(!privatePosts);
  };

  const handleNewPostClick = (event: MouseEvent) => {
    const token = getCookie("accessToken");
    if (!token) {
      event.preventDefault();
      Swal.fire({
        icon: "error",
        title: "로그인 필요",
        text: "게시글 작성은 로그인 후 이용 가능합니다.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
    }
  };

  return (
    <div className="flex flex-col mx-auto pt-[40px] min-w-max w-2/3 min-h-screen">
      <div className="flex justify-between mb-4">
        <SortButtons
          sortBy={sortBy}
          onSortChange={setSortBy}
          showPrivate={showPrivate}
          handlePrivatePostsToggle={handlePrivatePostsToggle}
        />
        <div className="flex">
          <Link to="/community/newpost" onClick={handleNewPostClick}>
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-blue-003 text-white-001 hover:scale-105 transition-all duration-250"
            >
              새 게시글
            </button>
          </Link>
        </div>
      </div>
      {filteredPosts.length === 0 ? (
        <div className="flex justify-center items-center mt-[60px]">
          <p className="my-[5rem] text-xl font-medium">검색 결과가 없습니다</p>
        </div>
      ) : (
        <ul className="w-full">
          {filteredPosts.map((post) => (
            <li key={post.communityId}>
              <Link to={`/community/${post.communityId}`}>
                <div className="flex justify-between items-center w-full mb-4 px-8 py-2 border-2 border-blue-003 rounded-lg hover:bg-platinum-003 transition-all duration-250">
                  <div>
                    <p className="mb-2 mr-[40px] text-xl font-bold">
                      {post.communityName}
                    </p>
                    {/* <div className="flex">
                      <p>작성일: {post.travelEndDate}</p>
                    </div> */}
                  </div>
                  <div className="flex items-center">
                    <NoProfile width={16} height={16} />
                    <p className="ml-1 mr-4 font-medium">
                      {post.memberNickname}
                    </p>
                    <div>
                      <p className="flex items-center">
                        <Like width={20} height={20} /> {post.likeCount}
                      </p>
                      <p className="font-thin text-sm text-gray-002">
                        작성일:{" "}
                        {new Date(post.createdDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Pagination page={page} lastPage={lastPage} setPage={setPage} />
    </div>
  );
};

export default Lists;
