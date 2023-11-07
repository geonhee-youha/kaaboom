import { UserProps, userDefaultProps } from "./user";

export type CommentProps = {
  id: number;
  order: number;
  reply: number | null;
  body: string;
  createdAt: string;
  user: UserProps;
};
export const commentDefaultProps = {
  id: 0,
  order: 0,
  reply: 0,
  body: "",
  createdAt: new Date(),
  user: userDefaultProps,
};
