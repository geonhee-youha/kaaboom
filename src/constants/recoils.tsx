import { atom } from "recoil";
import { videoTypes } from "../data";
import _ from "lodash";
import { MessageProps, messages } from "../data/message";

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
  //추가
  completedDate?: Date;
  canceledDate?: Date;
  declinedDate?: Date;
  user: {
    id: string;
  };
};

export const tempOrders: OrderProps[] = [
  {
    id: `1`,
    artist: {
      id: "2",
    },
    date: new Date("2023-10-16"),
    state: "requested",
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
    user: {
      id: "1",
    },
  },
  {
    id: `2`,
    artist: {
      id: "2",
    },
    date: new Date("2023-10-15"),
    state: "requested",
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
    user: {
      id: "2",
    },
  },
  {
    id: `3`,
    artist: {
      id: "6",
    },
    date: new Date("2023-10-11"),
    state: "canceled",
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
    canceledDate: new Date("2023-10-12"),
    user: {
      id: "3",
    },
  },
  {
    id: `4`,
    artist: {
      id: "6",
    },
    date: new Date("2023-10-09"),
    state: "completed",
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
    completedDate: new Date("2023-10-10"),
    user: {
      id: "1",
    },
  },
  {
    id: `5`,
    artist: {
      id: "6",
    },
    date: new Date("2023-10-09"),
    state: "declined",
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
    declinedDate: new Date("2023-10-09"),
    user: {
      id: "4",
    },
  },
  {
    id: `6`,
    artist: {
      id: "6",
    },
    date: new Date("2023-10-01"),
    state: "expired",
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
    user: {
      id: "4",
    },
  },
  {
    id: `7`,
    artist: {
      id: "2",
    },
    date: new Date("2023-10-10"),
    state: "requested",
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
    user: {
      id: "2",
    },
  },
  {
    id: `8`,
    artist: {
      id: "2",
    },
    date: new Date("2023-10-10"),
    state: "requested",
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
    user: {
      id: "2",
    },
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


type TempUserProps = {
  id: string;
  name: string;
  nickname: string;
  thumbnail: string;
  bio?: string;
  nation: string;
  gender: string;
  birthDate: Date;
};

export const tempUsers: TempUserProps[] = [
  {
    id: "1",
    name: "Guny Lee",
    nickname: "",
    thumbnail: "",
    bio: "",
    nation: "US",
    gender: "W",
    birthDate: new Date("1988-12-08"),
  },
  {
    id: "2",
    name: "Jinho Kim",
    nickname: "",
    thumbnail: "",
    bio: "",
    nation: "BR",
    gender: "M",
    birthDate: new Date("1993-03-17"),
  },
  {
    id: "3",
    name: "Haerin Kang",
    nickname: "",
    thumbnail: "",
    bio: "",
    nation: "KO",
    gender: "F",
    birthDate: new Date("2004-06-22"),
  },
  {
    id: "4",
    name: "Kunil Jeong",
    nickname: "",
    thumbnail: "",
    bio: "",
    nation: "IN",
    gender: "F",
    birthDate: new Date("1999-11-02"),
  },
];
