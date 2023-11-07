import { atom } from "recoil";
import { userInfoDefaultProps, UserInfoProps, UserProps, userDefaultProps } from "../types/user";
export const userInfoState = atom<UserInfoProps>({
  key: "user/userInfoState",
  default: userInfoDefaultProps,
});

//위로 지울 것
export const meState = atom<UserProps>({
  key: "user/meState",
  default: userDefaultProps,
});
