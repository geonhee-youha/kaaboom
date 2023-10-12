import _ from "lodash";
import { agencies } from "./agency";
import { groups } from "./group";
import { LinkProps, NationProps } from ".";

export type ArtistProps = {
  id: string;
  name: string;
  thumbnail: string;
  realName?: string;
  birthday?: Date;
  placeOfBirth?: string;
  nationalities: NationProps[];
  body: {
    height?: number;
    weight?: number;
    bloodType?: string;
  };
  families: React.ReactNode[];
  educations?: {
    name: string;
    state: string;
  }[];
  agencies?: {
    name: string;
  }[];
  group?: {
    name: string;
  };
  positions: string[];
  debuts: {
    solo?: {
      date: Date;
      album: string;
    };
    group?: {
      date: Date;
      group: {
        name: string;
      };
      album: string;
    };
  };
  fandom?: {
    name: string;
    link: string;
    thumbnail?: string;
  };
  nicknames?: string[];
  mbti: string;
  links?: LinkProps[];
  quickResponse?: boolean;
  bio?: React.ReactNode;
};

export const artists: ArtistProps[] = [
  {
    id: "1",
    name: "FATOU",
    thumbnail: "/temp/artists/1.jpg",
    realName: "Fatou Samba",
    birthday: new Date("1995-03-23"),
    placeOfBirth: "Yoff, Dakar, Senegal",
    nationalities: [
      {
        name: "Belgium",
        thumbnail: "/temp/nations/belgium.svg",
      },
    ],
    body: {
      height: 173,
    },
    families: ["parents", "younger brother"],
    agencies: [
      {
        name: "DR Music",
      },
    ],
    group: {
      name: "BLACKSWAN",
    },
    positions: ["Leader", "Main Rapper"],
    debuts: {
      group: {
        date: new Date("2020-10-16"),
        group: {
          name: "BLACKSWAN",
        },
        album: "Goodbye RANIA - THE 1ST FULL ALBUM",
      },
    },
    mbti: "ENTP-A",
    links: [
      {
        type: "instagram",
        link: "https://www.instagram.com/b_fatou_s/",
      },
      {
        type: "x-twitter",
        link: "https://twitter.com/b_fatou_s",
      },
    ],
    bio: (
      <>
        Hey army💜 I want to invite you to a wonderful group on 𝐓𝐄-𝐋𝐄 𝐆𝐑𝐌
        メFINALDREAM_BTS~🥂🥀 𝗦𝗲𝗮𝗿𝗰𝗵:- @Bull3tproofArmy on 𝗧𝗲-𝗹𝗲 𝗴𝗿𝗺 nd join us.
        here we talk about our 𝗕𝗔𝗡𝗚𝗧𝗔𝗡 𝗕𝗢𝗬𝗦 with army's all over the world🦋 𝗧𝗛𝗘
        𝗚𝗥𝗢𝗨𝗣 𝗜𝗦 𝗢𝗡𝗟𝗬 𝗙𝗢𝗥 𝗚𝗜𝗥𝗟𝗦... & 𝗜𝗧'𝗦 𝗖𝗢𝗠𝗣𝗟𝗘𝗧𝗘𝗟𝗬 𝗦𝗔𝗙𝗘 !! ✨ 𝗕𝗢𝗥𝗔𝗛𝗔𝗘💜 We
        would be very appreciate to see you there💗
      </>
    ),
  },
  {
    id: "2",
    name: "NVEE",
    thumbnail: "/temp/artists/2.webp",
    realName: "Florence Alena Smith",
    birthday: new Date("1999-01-10"),
    placeOfBirth: "Alexandria, Virginia, USA",
    nationalities: [
      {
        name: "USA",
        thumbnail: "/temp/nations/usa.svg",
      },
    ],
    body: {
      height: 169,
    },
    families: ["mother", "youngest of 2 sons and 2 daughters", "3 nephews"],
    agencies: [
      {
        name: "DR Music",
      },
    ],
    group: {
      name: "BLACKSWAN",
    },
    positions: ["Main Vocal"],
    debuts: {
      group: {
        date: new Date("2023-05-19"),
        group: {
          name: "BLACKSWAN",
        },
        album: "That Karma - THE 2ND SINGLE",
      },
    },
    mbti: "ISFP-T",
    links: [
      {
        type: "instagram",
        link: "https://www.instagram.com/n_v.ee/",
      },
    ],
    bio: (
      <>
        Hey army💜 I want to invite you to a wonderful group on 𝐓𝐄-𝐋𝐄 𝐆𝐑𝐌
        メFINALDREAM_BTS~🥂🥀 𝗦𝗲𝗮𝗿𝗰𝗵:- @Bull3tproofArmy on 𝗧𝗲-𝗹𝗲 𝗴𝗿𝗺 nd join us.
        here we talk about our 𝗕𝗔𝗡𝗚𝗧𝗔𝗡 𝗕𝗢𝗬𝗦 with army's all over the world🦋 𝗧𝗛𝗘
        𝗚𝗥𝗢𝗨𝗣 𝗜𝗦 𝗢𝗡𝗟𝗬 𝗙𝗢𝗥 𝗚𝗜𝗥𝗟𝗦... & 𝗜𝗧'𝗦 𝗖𝗢𝗠𝗣𝗟𝗘𝗧𝗘𝗟𝗬 𝗦𝗔𝗙𝗘 !! ✨ 𝗕𝗢𝗥𝗔𝗛𝗔𝗘💜 We
        would be very appreciate to see you there💗
      </>
    ),
  },
  {
    id: "3",
    name: "GABI",
    thumbnail: "/temp/artists/3.webp",
    realName: "Gabriela Strassburger Dalcin",
    birthday: new Date("2002-11-07"),
    placeOfBirth: "Estado de Santa Catarina, Brasil",
    nationalities: [
      {
        name: "Brasil",
        thumbnail: "/temp/nations/brasil.svg",
      },
      {
        name: "Germany",
        thumbnail: "/temp/nations/germany.svg",
      },
    ],
    body: {
      height: 172,
    },
    families: ["parents", "younger sister"],
    agencies: [
      {
        name: "DR Music",
      },
    ],
    group: {
      name: "BLACKSWAN",
    },
    positions: ["Sub Vocal", "Lead Dancer"],
    debuts: {
      group: {
        date: new Date("2023-05-19"),
        group: {
          name: "BLACKSWAN",
        },
        album: "That Karma - THE 2ND SINGLE",
      },
    },
    mbti: "ENFP-T",
    links: [
      {
        type: "instagram",
        link: "https://www.instagram.com/gabsdalcin/",
      },
      {
        type: "twitter",
        link: "https://twitter.com/gabsdalcin",
      },
      {
        type: "tiktok",
        link: "https://www.tiktok.com/@gabsdalcin",
      },
    ],
    bio: (
      <>
        Hey army💜 I want to invite you to a wonderful group on 𝐓𝐄-𝐋𝐄 𝐆𝐑𝐌
        メFINALDREAM_BTS~🥂🥀 𝗦𝗲𝗮𝗿𝗰𝗵:- @Bull3tproofArmy on 𝗧𝗲-𝗹𝗲 𝗴𝗿𝗺 nd join us.
        here we talk about our 𝗕𝗔𝗡𝗚𝗧𝗔𝗡 𝗕𝗢𝗬𝗦 with army's all over the world🦋 𝗧𝗛𝗘
        𝗚𝗥𝗢𝗨𝗣 𝗜𝗦 𝗢𝗡𝗟𝗬 𝗙𝗢𝗥 𝗚𝗜𝗥𝗟𝗦... & 𝗜𝗧'𝗦 𝗖𝗢𝗠𝗣𝗟𝗘𝗧𝗘𝗟𝗬 𝗦𝗔𝗙𝗘 !! ✨ 𝗕𝗢𝗥𝗔𝗛𝗔𝗘💜 We
        would be very appreciate to see you there💗
      </>
    ),
  },
  {
    id: "4",
    name: "SRIYA",
    thumbnail: "/temp/artists/4.webp",
    realName: "Sriya Lenka",
    birthday: new Date("2003-09-15"),
    placeOfBirth: "Odisha, India",
    nationalities: [
      {
        name: "India",
        thumbnail: "/temp/nations/india.svg",
      },
    ],
    body: {
      height: 170,
    },
    families: ["parents", "younger brother", "younger sister"],
    agencies: [
      {
        name: "DR Music",
      },
    ],
    group: {
      name: "BLACKSWAN",
    },
    positions: ["Main Dancer", "Lead Vocal"],
    debuts: {
      group: {
        date: new Date("2023-05-19"),
        group: {
          name: "BLACKSWAN",
        },
        album: "That Karma - THE 2ND SINGLE",
      },
    },
    mbti: "ENFP-T",
    links: [
      {
        type: "instagram",
        link: "https://www.instagram.com/sriyalenka.bs/",
      },
    ],
    bio: (
      <>
        Hey army💜 I want to invite you to a wonderful group on 𝐓𝐄-𝐋𝐄 𝐆𝐑𝐌
        メFINALDREAM_BTS~🥂🥀 𝗦𝗲𝗮𝗿𝗰𝗵:- @Bull3tproofArmy on 𝗧𝗲-𝗹𝗲 𝗴𝗿𝗺 nd join us.
        here we talk about our 𝗕𝗔𝗡𝗚𝗧𝗔𝗡 𝗕𝗢𝗬𝗦 with army's all over the world🦋 𝗧𝗛𝗘
        𝗚𝗥𝗢𝗨𝗣 𝗜𝗦 𝗢𝗡𝗟𝗬 𝗙𝗢𝗥 𝗚𝗜𝗥𝗟𝗦... & 𝗜𝗧'𝗦 𝗖𝗢𝗠𝗣𝗟𝗘𝗧𝗘𝗟𝗬 𝗦𝗔𝗙𝗘 !! ✨ 𝗕𝗢𝗥𝗔𝗛𝗔𝗘💜 We
        would be very appreciate to see you there💗
      </>
    ),
  },
  {
    id: "5",
    name: "JULIE",
    thumbnail: "/temp/artists/5.webp",
    realName: "Julie Han",
    birthday: new Date("2000-03-29"),
    placeOfBirth: "Honolulu, Hawaii, USA",
    nationalities: [
      {
        name: "Korea",
        thumbnail: "/temp/nations/korea.svg",
      },
      {
        name: "USA",
        thumbnail: "/temp/nations/usa.svg",
      },
    ],
    body: {
      height: 162,
    },
    families: ["parents"],
    agencies: [
      {
        name: "S2 Entertainment",
      },
    ],
    group: {
      name: "KISS OF LIFE",
    },
    positions: ["Leader", "Main Rapper", "Sub Vocal"],
    debuts: {
      group: {
        date: new Date("2023-07-05"),
        group: {
          name: "KISS OF LIFE",
        },
        album: "KISS OF LIFE - 1st Mini Album",
      },
    },
    mbti: "ENFP",
    links: [
      {
        type: "instagram",
        link: "https://www.instagram.com/ysjsodp_77",
      },
    ],
    bio: (
      <>
        Hey army💜 I want to invite you to a wonderful group on 𝐓𝐄-𝐋𝐄 𝐆𝐑𝐌
        メFINALDREAM_BTS~🥂🥀 𝗦𝗲𝗮𝗿𝗰𝗵:- @Bull3tproofArmy on 𝗧𝗲-𝗹𝗲 𝗴𝗿𝗺 nd join us.
        here we talk about our 𝗕𝗔𝗡𝗚𝗧𝗔𝗡 𝗕𝗢𝗬𝗦 with army's all over the world🦋 𝗧𝗛𝗘
        𝗚𝗥𝗢𝗨𝗣 𝗜𝗦 𝗢𝗡𝗟𝗬 𝗙𝗢𝗥 𝗚𝗜𝗥𝗟𝗦... & 𝗜𝗧'𝗦 𝗖𝗢𝗠𝗣𝗟𝗘𝗧𝗘𝗟𝗬 𝗦𝗔𝗙𝗘 !! ✨ 𝗕𝗢𝗥𝗔𝗛𝗔𝗘💜 We
        would be very appreciate to see you there💗
      </>
    ),
  },
  {
    id: "6",
    name: "NATTY",
    thumbnail: "/temp/artists/6.webp",
    realName: "Ahnatchaya Suputhipong",
    birthday: new Date("2000-03-29"),
    placeOfBirth: "Honolulu, Hawaii, USA",
    nationalities: [
      {
        name: "Tailand",
        thumbnail: "/temp/nations/tailand.svg",
      },
    ],
    body: {
      height: 166,
      weight: 46,
      bloodType: "O",
    },
    families: ["parents"],
    agencies: [
      {
        name: "S2 Entertainment",
      },
    ],
    group: {
      name: "KISS OF LIFE",
    },
    positions: ["Main Dancer", "Lead Rapper", "Sub Vocal"],
    debuts: {
      solo: {
        date: new Date("2020-05-07"),
        album: "NINETEEN - THE 1st SINGLE ALBUM",
      },
      group: {
        date: new Date("2023-07-05"),
        group: {
          name: "KISS OF LIFE",
        },
        album: "KISS OF LIFE - 1st Mini Album",
      },
    },
    fandom: {
      name: "TwiNny",
      link: "",
      thumbnail: "/temp/fandoms/twinny.webp",
    },
    mbti: "INFJ",
    links: [
      {
        type: "x-twitter",
        link: "https://twitter.com/NToffcl_twt",
      },
      {
        type: "facebook",
        link: "https://www.facebook.com/NToffcl.fb",
      },
      {
        type: "youtube",
        link: "https://www.youtube.com/channel/UCAiJ79gAil8t-Vbn9LnMJzw",
      },
      {
        type: "instagram",
        link: "https://www.instagram.com/nt.offcl",
        label: "Official",
      },
      {
        type: "instagram",
        link: "https://www.instagram.com/natty_0530/",
        label: "Indivisual",
      },
      {
        type: "cafe-daum",
        link: "http://cafe.daum.net/OfficialNT",
      },
      {
        type: "tiktok",
        link: "https://www.tiktok.com/@nt.offcl",
      },
    ],
    bio: (
      <>
        Hey army💜 I want to invite you to a wonderful group on 𝐓𝐄-𝐋𝐄 𝐆𝐑𝐌
        メFINALDREAM_BTS~🥂🥀 𝗦𝗲𝗮𝗿𝗰𝗵:- @Bull3tproofArmy on 𝗧𝗲-𝗹𝗲 𝗴𝗿𝗺 nd join us.
        here we talk about our 𝗕𝗔𝗡𝗚𝗧𝗔𝗡 𝗕𝗢𝗬𝗦 with army's all over the world🦋 𝗧𝗛𝗘
        𝗚𝗥𝗢𝗨𝗣 𝗜𝗦 𝗢𝗡𝗟𝗬 𝗙𝗢𝗥 𝗚𝗜𝗥𝗟𝗦... & 𝗜𝗧'𝗦 𝗖𝗢𝗠𝗣𝗟𝗘𝗧𝗘𝗟𝗬 𝗦𝗔𝗙𝗘 !! ✨ 𝗕𝗢𝗥𝗔𝗛𝗔𝗘💜 We
        would be very appreciate to see you there💗
      </>
    ),
  },
  {
    id: "7",
    name: "BELLE",
    thumbnail: "/temp/artists/7.webp",
    realName: "沈혜원, Shim Hyewon",
    birthday: new Date("2004-03-20"),
    placeOfBirth: "Seattle, Washington, USA",
    nationalities: [
      {
        name: "Korea",
        thumbnail: "/temp/nations/korea.svg",
      },
      {
        name: "USA",
        thumbnail: "/temp/nations/usa.svg",
      },
    ],
    body: {
      height: 167,
    },
    families: [
      "father - Shim Sin",
      "mother - Lee Eunhye",
      "older bother - Sim Dongheon",
      "Cousin - Cherry Coke",
    ],
    educations: [
      {
        name: "Cheolsan Elementary School",
        state: "graduated",
      },
      {
        name: "Cheolsan Middle School",
        state: "graduated",
      },
      {
        name: "Soha High School",
        state: "graduated",
      },
    ],
    agencies: [
      {
        name: "S2 Entertainment",
      },
      {
        name: "AURA Entertainment",
      },
    ],
    group: {
      name: "KISS OF LIFE",
    },
    positions: ["Main Vocal"],
    debuts: {
      group: {
        date: new Date("2023-07-05"),
        group: {
          name: "KISS OF LIFE",
        },
        album: "KISS OF LIFE - 1st Mini Album",
      },
    },
    mbti: "ENFP",
    links: [
      {
        type: "instagram",
        link: "https://www.instagram.com/belleyourviolet/",
      },
      {
        type: "soundcloud",
        link: "https://www.instagram.com/nt.offcl",
      },
    ],
    bio: (
      <>
        Hey army💜 I want to invite you to a wonderful group on 𝐓𝐄-𝐋𝐄 𝐆𝐑𝐌
        メFINALDREAM_BTS~🥂🥀 𝗦𝗲𝗮𝗿𝗰𝗵:- @Bull3tproofArmy on 𝗧𝗲-𝗹𝗲 𝗴𝗿𝗺 nd join us.
        here we talk about our 𝗕𝗔𝗡𝗚𝗧𝗔𝗡 𝗕𝗢𝗬𝗦 with army's all over the world🦋 𝗧𝗛𝗘
        𝗚𝗥𝗢𝗨𝗣 𝗜𝗦 𝗢𝗡𝗟𝗬 𝗙𝗢𝗥 𝗚𝗜𝗥𝗟𝗦... & 𝗜𝗧'𝗦 𝗖𝗢𝗠𝗣𝗟𝗘𝗧𝗘𝗟𝗬 𝗦𝗔𝗙𝗘 !! ✨ 𝗕𝗢𝗥𝗔𝗛𝗔𝗘💜 We
        would be very appreciate to see you there💗
      </>
    ),
  },
  {
    id: "8",
    name: "HANEUL",
    thumbnail: "/temp/artists/8.webp",
    realName: "Won Haneul",
    birthday: new Date("2005-05-25"),
    placeOfBirth: "Paldal-gu, Gyeonggi-do, Korea",
    nationalities: [
      {
        name: "republic of korea",
        thumbnail: "/temp/nations/korea.svg",
      },
    ],
    body: {
      height: 168,
    },
    families: ["parents", "younger brother", "younger sister"],
    educations: [
      {
        name: "Jidong Elementary School",
        state: "graduated",
      },
      {
        name: "Woncheon Middle School",
        state: "graduated",
      },
      {
        name: "Suwon Women's High School",
        state: "drop out",
      },
    ],
    agencies: [
      {
        name: "S2 Entertainment",
      },
    ],
    group: {
      name: "KISS OF LIFE",
    },
    positions: ["Lead Vocal"],
    debuts: {
      group: {
        date: new Date("2023-07-05"),
        group: {
          name: "KISS OF LIFE",
        },
        album: "KISS OF LIFE - 1st Mini Album",
      },
    },
    mbti: "ESTJ",
    bio: (
      <>
        Hey army💜 I want to invite you to a wonderful group on 𝐓𝐄-𝐋𝐄 𝐆𝐑𝐌
        メFINALDREAM_BTS~🥂🥀 𝗦𝗲𝗮𝗿𝗰𝗵:- @Bull3tproofArmy on 𝗧𝗲-𝗹𝗲 𝗴𝗿𝗺 nd join us.
        here we talk about our 𝗕𝗔𝗡𝗚𝗧𝗔𝗡 𝗕𝗢𝗬𝗦 with army's all over the world🦋 𝗧𝗛𝗘
        𝗚𝗥𝗢𝗨𝗣 𝗜𝗦 𝗢𝗡𝗟𝗬 𝗙𝗢𝗥 𝗚𝗜𝗥𝗟𝗦... & 𝗜𝗧'𝗦 𝗖𝗢𝗠𝗣𝗟𝗘𝗧𝗘𝗟𝗬 𝗦𝗔𝗙𝗘 !! ✨ 𝗕𝗢𝗥𝗔𝗛𝗔𝗘💜 We
        would be very appreciate to see you there💗
      </>
    ),
  },
];
