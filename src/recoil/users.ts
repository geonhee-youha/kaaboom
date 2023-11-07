import { atom } from "recoil";
import { userDefaultProps, UserProps } from "../types";

export const userState = atom<UserProps>({
  key: "recoil/user",
  default: userDefaultProps,
});
export const pushMissionState = atom<boolean>({
  key: "recoil/pushMission",
  default: false,
});
export const pushWaterState = atom<boolean>({
  key: "recoil/pushWater",
  default: false,
});
export const pushCommentState = atom<boolean>({
  key: "recoil/pushComment",
  default: false,
});
export const pushAdState = atom<boolean>({
  key: "recoil/pushAd",
  default: false,
});
