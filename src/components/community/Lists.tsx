import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { getCommunityAPI } from "../../api/communityAPI";
import { ReactComponent as Like } from "../../assets/heartFill.svg";
import { ReactComponent as NoProfile } from "../../assets/smile.svg";
import { condition } from "../../state/condition";
import { postList } from "../../store/postList";
import Pagination from "./Pagination";

const Lists = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [posts, setPosts] = useRecoilState(postList);
  const selectedSortCondition = useRecoilValue(condition);

  const init = async () => {
    const response = await getCommunityAPI({
      page: 1,
      size: 10,
      type: "title",
      sort: "recent",
      keyword: "",
    });
    setPosts(response);
    setTotalPage(response.totalPages);
  };

  const getCommunityList = async () => {
    const resendObj = {
      keyword: selectedSortCondition.keyword,
      type: selectedSortCondition.type,
      sort: selectedSortCondition.sort,
      page,
      size: 10,
    };

    const response = await getCommunityAPI(resendObj);
    setPosts(response);
    setTotalPage(response.totalPages);
  };

  useEffect(() => {
    getCommunityList();
  }, [page]);

  useEffect(() => {
    setTotalPage(posts.totalPages);
  }, [posts]);

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="flex flex-col mx-auto pt-[40px] w-full min-h-screen max-w-[50rem] px-4 sm:px-0">
      <div className="flex flex-row-reverse justify-between mt-8 mb-12">
        <div className="flex">
          <Link to="/community/newpost">
            <button
              type="button"
              className="px-4 py-3 rounded-lg bg-blue-003 text-white-001 hover:scale-105 transition-all duration-250"
            >
              게시글 작성
            </button>
          </Link>
        </div>
      </div>
      {posts.communities.length === 0 ? (
        <div className="flex justify-center items-center mt-[60px]">
          <p className="my-[5rem] text-xl font-medium">검색 결과가 없습니다</p>
        </div>
      ) : (
        <ul className="w-full">
          {posts.communities.map((post) => (
            <li key={post.communityId}>
              <Link to={`/community/${post.communityId}`}>
                <div className="flex justify-between items-center w-full mb-4 px-8 py-2 border-2 border-blue-003 rounded-lg hover:scale-105 transition-all duration-250">
                  <p className="grow text-xl font-bold truncate">
                    {post.communityName}
                  </p>
                  <div className="flex flex-col items-center md:w-[15rem] sm:w-[10rem] py-1">
                    <div className="flex items-center">
                      <NoProfile width={16} height={16} />
                      <p className="ml-1 mr-4 py-1 font-medium">
                        {post.memberNickname}
                      </p>
                    </div>
                    <p className="flex items-center text-sm">
                      <span className="mr-1">
                        <Like width={15} height={15} />
                      </span>
                      좋아요 : {post.likeCount}
                    </p>
                    <p className="py-1 text-sm">
                      작성일: {new Date(post.createdDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Pagination currentPage={page} totalPage={totalPage} setPage={setPage} />
    </div>
  );
};

export default Lists;
