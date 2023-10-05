import _ from "lodash";
import { agencies } from "./agency";
import { artists } from "./artist";
import { LinkProps } from ".";

export type GroupProps = {
  id: string;
  name: string;
  thumbnail: string;
  debutDate: Date;
  debutAlbum: string; //추후 수정 필요
  genres: string[];
  leader: {
    name: string;
  };
  agency: {
    name: string;
  };
  fandom?: {
    name: string;
    thumbnail?: string;
    link?: string;
  };
  links: LinkProps[];
  colors: {
    inners: string[];
    borders?: string[];
    backgrounds: string[];
  };
};

export const groups: GroupProps[] = [
  {
    id: "BSW",
    name: "BLACKSWAN",
    thumbnail:
      "https://i.namu.wiki/i/9e8lvO0vA7VeNxBz0Ak71lzvgRtaDdf3Jw7LsQu8ep89o0vvSWmTMMp-aro5jFZmQpGRVQl7is-lwcd2IjWBna4dW7hHidhyHEoQBopm9-C68HPqRHoKp_E_fM5o6mZeJQvGRUpuoVFl8U2hA5JOSw.svg",
    debutDate: new Date("2023-07-05"),
    debutAlbum: "KISS OF LIFE - 1st Mini Album",
    genres: ["Dance", "R&B", "Soul"],
    leader: {
      name: "JULIE",
    },
    agency: {
      name: "S2 Entertainment",
    },
    fandom: {
      name: "KISSY",
      thumbnail:
        "https://i.namu.wiki/i/6yT_3tDDrvQqWUnTKaDNURZdsaOXAyY_oVzPCcTHydY7-BwfjjgGPwmpNLv1KtjHLDTAaxtJ9ludQMJPNFoaVlXXaEMlzZnLR_uNvs9vwLSe3DkAC4T9buNMB4ZC39wNPG3DHyuuhGiCvgYwZKSknA.webp",
    },
    links: [
      {
        type: "youtube",
        link: "https://youtube.com/@KISSOFLIFE_official",
      },
      {
        type: "instagram",
        link: "https://instagram.com/kissoflife_s2",
      },
      {
        type: "twitter",
        link: "https://twitter.com/KISSOFLIFE_S2",
      },
      {
        type: "facebook",
        link: "https://facebook.com/KISSOFLIFEofficial",
      },
      {
        type: "tiktok",
        link: "https://www.tiktok.com/@kissoflife_official",
      },
      {
        type: "daum-cafe",
        link: "https://cafe.daum.net/KISSOFLIFE",
      },
    ],
    colors: {
      inners: ["#000000"],
      borders: ["##f3002e"],
      backgrounds: ["#000000"]
    },
  },
  {
    id: "KOL",
    name: "KISS OF LIFE",
    thumbnail:
      "https://i.namu.wiki/i/BdFCJMuhjxdNsH-kDPxuq_NRa5Di5DLTxpdLUKQwPcEEs9xsfIw0_88DzuMHTb_9KOiBZ5wx5FsrAgz-1fxlYGtXN9Fa-Hw8wOl1bp5eaYVe7SUn0HqYbZ22VUBLHcicdnOzP7aDRenRcClot6o2bA.webp",
    debutDate: new Date("2020-10-16"),
    debutAlbum: "Goodbye RANIA - THE 1ST FULL ALBUM",
    genres: ["Dance", "POP", "Hiphop"],
    leader: {
      name: "FATOU",
    },
    agency: {
      name: "DR Music",
    },
    fandom: {
      name: "LUMINA",
    },
    links: [
      {
        type: "bstage",
        link: "https://blackswan.bstage.in/",
      },
      {
        type: "twitter",
        link: "https://twitter.com/blackswan_drent",
        label: "Official",
      },
      {
        type: "twitter",
        link: "https://twitter.com/blackswan_staff",
        label: "Staff",
      },
      {
        type: "facebook",
        link: "http://facebook.com/drmusicblackswan",
      },
      {
        type: "instagram",
        link: "https://www.instagram.com/blackswan___official/",
      },
      {
        type: "youtube",
        link: "https://www.youtube.com/raniaofficialchannel",
      },
      {
        type: "daum-cafe",
        link: "http://cafe.daum.net/1248.",
      },
      {
        type: "dcinside",
        link: "https://m.dcinside.com/board/blackswan",
      },
    ],
    colors: {
      inners: ["#AB0033", "#1D1D1B"],
      backgrounds: ["#1D1D1B"],
    },
  },
];
