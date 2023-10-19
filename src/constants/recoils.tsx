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
      id: "4",
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
      id: "3",
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
      id: "4",
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
      id: "1",
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
      id: "3",
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
    id: `10`,
    artist: {
      id: "3",
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
    id: `11`,
    artist: {
      id: "4",
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
      id: "2",
    },
  },
  {
    id: `12`,
    artist: {
      id: "3",
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
    id: `13`,
    artist: {
      id: "1",
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
      id: "3",
    },
  },
  {
    id: `14`,
    artist: {
      id: "2",
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
      id: "4",
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

export type TempUserProps = {
  id: string;
  name: string;
  nickname: string;
  thumbnail: string;
  bio?: string;
  nation: string;
  gender: string;
  birthDate: Date;
  email: string;
};

export const tempUsers: TempUserProps[] = [
  {
    id: "1",
    name: "Guny Lee",
    nickname: "",
    thumbnail: "",
    bio: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
    nation: "US",
    gender: "F",
    birthDate: new Date("1988-12-08"),
    email: "lghjazz@gmail.com",
  },
  {
    id: "2",
    name: "Jinho Kim",
    nickname: "",
    thumbnail: "",
    bio: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
    nation: "BR",
    gender: "M",
    birthDate: new Date("1993-03-17"),
    email: "lghjazz@gmail.com",
  },
  {
    id: "3",
    name: "Haerin Kang",
    nickname: "",
    thumbnail: "",
    bio: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
    nation: "KR",
    gender: "F",
    birthDate: new Date("2004-06-22"),
    email: "lghjazz@gmail.com",
  },
  {
    id: "4",
    name: "Kunil Jeong",
    nickname: "",
    thumbnail: "",
    bio: "",
    nation: "IN",
    gender: "O",
    birthDate: new Date("1999-11-02"),
    email: "lghjazz@gmail.com",
  },
];

export type DialogProps = {
  open: boolean;
  title: string;
  description: string;
  cancel: {
    show: boolean;
    label: React.ReactNode;
    onClick: () => void;
  };
  confirm: {
    label: React.ReactNode;
    onClick: () => void;
    onConfirm: (e?: any) => void;
    color?: string;
  };
};

export const dialogDefaultProps: DialogProps = {
  open: false,
  title: "",
  description: "",
  cancel: {
    show: true,
    label: "cancel",
    onClick: () => {},
  },
  confirm: {
    label: "confirm",
    onClick: () => {},
    onConfirm: () => {},
  },
};

export const dialogState = atom<DialogProps>({
  key: "dialogState/forArtist",
  default: dialogDefaultProps,
});

export const sideNavigationState = atom({
  key: "sideNavigationState",
  default: {
    open: false,
  },
});


export const selectDrawerState = atom({
  key: "selectDrawerState",
  default: {
    open: false,
    id: ''
  },
});


export const tempLoadedRequestsState = atom({
  key: "tempLoaded/requests",
  default: false,
});

export const requestsState = atom<OrderProps[]>({
  key: "requestsState",
  default: [],
});

export const tempLoadedMessagesState = atom({
  key: "tempLoaded/messages",
  default: false,
});


export const tempLoadedProfileState = atom({
  key: "tempLoaded/profile",
  default: false,
});


export const tempMessageIdsState = atom<string[]>({
  key: "tempMessageIdsState",
  default: [],
});


export const tempOrderIdsState = atom<string[]>({
  key: "tempOrderIdsState",
  default: [],
});


export const tempSendVideoIdState = atom<string[]>({
  key: "tempSendVideoIdState",
  default: [],
});

export const streamState = atom<any | null>({
  key: `streamState`,
  default: null,
});

export const recordedVideoState = atom<string | null>({
  key: `recordedVideoState`,
  default: null,
});
export const videoChunksState = atom<any[]>({
  key: "videoChunksState",
  default: [],
});