import { atom } from "recoil";
import { videoTypes } from "../data";
import _ from "lodash";
import { MessageProps, messages } from "../data/message";

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

export const rateDialogRecoilState = atom({
  key: "rateDialog",
  default: {
    id: '',
    open: false,
  },
});

export const sideDrawerRecoilState = atom({
  key: "sideDrawer",
  default: {
    open: false,
  },
});

export const loginRecoilState = atom({
  key: "login",
  default: false,
});

export type OrderProps = {
  id: string;
  artist: {
    id: string;
  };
  date: Date;
  state: string;
  price: number;
  videoType: string;
  whomType: string;
  toFirstName: string;
  toType: string;
  fromFirstName?: string;
  fromType?: string;
  instructions: string;
  hideVideo: boolean;
};

export const tempOrders = [
  {
    id: `1`,
    artist: {
      id: "2",
    },
    date: new Date("2023-10-10"),
    state: "In progress",
    price:
      videoTypes[_.findIndex(videoTypes, (el) => el.value === "mini")].price,
    videoType: "mini",
    whomType: "myself",
    toFirstName: "lee",
    toType: "he",
    fromFirstName: "",
    fromType: "",
    instructions:
      "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
    hideVideo: false,
  },
  {
    id: `2`,
    artist: {
      id: "6",
    },
    date: new Date("2023-10-11"),
    state: "Canceled",
    price:
      videoTypes[_.findIndex(videoTypes, (el) => el.value === "long")].price,
    videoType: "long",
    whomType: "someone else",
    toFirstName: "lee",
    toType: "he",
    fromFirstName: "kim",
    fromType: "she",
    instructions:
      "t is a long established fact that a reader will be distracted.",
    hideVideo: true,
  },
  {
    id: `3`,
    artist: {
      id: "6",
    },
    date: new Date("2023-10-09"),
    state: "Completed",
    price:
      videoTypes[_.findIndex(videoTypes, (el) => el.value === "long")].price,
    videoType: "long",
    whomType: "someone else",
    toFirstName: "lee",
    toType: "he",
    fromFirstName: "kim",
    fromType: "she",
    instructions:
      "t is a long established fact that a reader will be distracted.",
    hideVideo: true,
  },
];

export const ordersState = atom<OrderProps[]>({
  key: "ordersState",
  default: [],
});

export const messagesState = atom<MessageProps[]>({
  key: "messagesState",
  default: messages,
});

export const favoriteIdsState = atom<string[]>({
  key: "favoriteIdsState",
  default: [],
});
