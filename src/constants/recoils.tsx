import { atom } from "recoil";

export const searchDialogRecoilState = atom({
  key: "searchDialog",
  default: {
    open: false,
  },
});

export const sortDialogRecoilState = atom({
  key: "sortDialog",
  default: {
    open: false,
  },
});

export const sideDrawerRecoilState = atom({
  key: "sideDrawer",
  default: {
    open: false,
  },
});
