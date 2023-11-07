import { atom } from "recoil";
import { CommentProps } from "../types/comment";

export const replyCommentTargetState = atom<CommentProps | null>({
  key: "comment/replyCommentTargetState",
  default: null,
});
export const deleteCommentTargetState = atom<CommentProps | null>({
  key: "comment/deleteCommentTargetState",
  default: null,
});
export const commentRefreshingState = atom<boolean>({
  key: "comment/commentRefreshingState",
  default: false,
});
export const lastCommentTargetState = atom<CommentProps | null>({
  key: "comment/lastCommentTargetState",
  default: null,
});
export const prevCommentsState = atom<CommentProps[]>({
  key: "comment/prevCommentsState",
  default: [],
});
