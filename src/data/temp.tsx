import { atom } from "recoil";

export const tempUserState = atom({
  key: "tempUser",
  default: {
    name: "Guny Lee",
    nickname: "",
    thumbnail: "",
    bio: "",
    nation: "",
    gender: "",
    birthDate: "",
    type: "user",
  },
});
