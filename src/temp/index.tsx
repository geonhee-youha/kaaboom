import { IconName } from "@fortawesome/fontawesome-svg-core";
import _ from "lodash";
import { atom } from "recoil";

export type NationProps = {
  name: string;
  thumbnail: string;
};

export type LinkProps = {
  type: string;
  link: string;
  label?: string;
};

export type VideoTypeProps = {
  value: string;
  label: string;
  maxVideoLength: number;
  maxLetters: number;
  price: number;
};

export const videoTypes: VideoTypeProps[] = [
  {
    value: "mini",
    label: "Mini",
    maxVideoLength: 15,
    maxLetters: 45,
    price: 20,
  },
  {
    value: "long",
    label: "Long",
    maxVideoLength: 45,
    maxLetters: 200,
    price: 90,
  },
];

export const whomTypes = [
  {
    value: "someoneElse",
    label: "Someone else",
  },
  {
    value: "myself",
    label: "Myself",
  },
];

export const toOrFromTypes = [
  {
    value: "he",
    label: "He/Him",
  },
  {
    value: "she",
    label: "She/Her",
  },
  {
    value: "they",
    label: "They/Them",
  },
];

export const deliverySpeeds = [
  {
    value: "standard",
    label: "Standard",
    description: "Up to 7 days",
  },
  {
    value: "24hr",
    label: "24hr Delivery",
    description: "Up to 24 hours",
  },
];

export const paymentMethods = [
  // {
  //   value: "card",
  //   label: "card",
  // }, //추후 추가
  {
    value: "paypal",
    label: "PayPal",
  },
];

export type RequestProps = {
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

export const requests: RequestProps[] = [
  {
    id: `1`,
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
      id: "1",
    },
  },
  {
    id: `1`,
    artist: {
      id: "2",
    },
    date: new Date("2023-10-11"),
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
    id: `2`,
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
    id: `3`,
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
    id: `4`,
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
    id: `5`,
    artist: {
      id: "6",
    },
    date: new Date("2023-10-09"),
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
    id: `5`,
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
    id: `6`,
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

export const requestStates = [
  { value: "requested", label: "Requested" },
  { value: "completed", label: "Completed" },
  { value: "expired", label: "Expired" },
  { value: "declined", label: "Declined" },
  { value: "canceled", label: "Canceled" },
];

export const requestsRecoilState = atom<any[]>({
  key: "requestsRecoilState",
  default: requests,
});

type FanProps = {
  id: string;
  name: string;
  nickname: string;
  thumbnail: string;
  bio?: string;
  nation: string;
  gender: string;
  birthDate: Date;
};

export const fans: FanProps[] = [
  {
    id: "1",
    name: "Guny Lee",
    nickname: "",
    thumbnail: "",
    bio: "",
    nation: "US",
    gender: "M",
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
