import { userDefaultProps } from ".";
import { UserProps } from "./user";
export type ImageProps = {
  mimeType: string;
  pathname: string;
};
export const imageDefaultProps = {
  mimeType: "image",
  pathname: "",
};
export type FeedProps = {
  id: number;
  body: string;
  images: ImageProps[];
  user: UserProps;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  liked: number;
  feedCategoryId: number;
};
export const feedDefaultProps = {
  id: 0,
  body: "",
  images: [imageDefaultProps],
  user: userDefaultProps,
  createdAt: new Date(),
  likesCount: 0,
  commentsCount: 0,
  liked: 0,
  feedCategoryId: 1,
};
