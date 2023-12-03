export interface ICommunityPost {
  commentCount: number;
  comments: IComment[];
  communityId: number;
  communityName: string;
  content: string;
  createdDate: string;
  liked: boolean;
  likeCount: number;
  memberId: number;
  memberNickname: string;
  travelEndDate: string;
  travelStartDate: string;
  communityPublicState: boolean;
}

export interface ICommunity {
  communities: ICommunityPost[];
  totalPages: number;
}

export interface ICommunityData {
  communities: ICommunityPost[];
  lastPage: boolean;
}

export interface IGetCommunityParams {
  keyword: string;
  page: number;
  size: number;
  type: string;
  sort: string;
}

export interface ICommentCreateForm {
  content: string;
  communityId: number;
}

export interface IComment {
  commentId: number;
  content: string;
  memberNickname: string;
  memberId: number;
}

export interface ICommentUpdateForm {
  content: string;
}

export interface ILikeProps {
  isLiked: boolean;
  communityId: number;
  initialLikeCount: number;
}
