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
  agency?: {
    name: string;
  };
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
  links: LinkProps[];
};

export const artists: ArtistProps[] = [
  {
    id: "1",
    name: "FATOU",
    thumbnail:
      "https://pbs.twimg.com/media/FaB9gCPUYAAtUQf.jpg",
    realName: "Fatou Samba",
    birthday: new Date("1995-03-23"),
    placeOfBirth: "Yoff, Dakar, Senegal",
    nationalities: [
      {
        name: "Belgium",
        thumbnail:
          "https://i.namu.wiki/i/FTpUb4VrEm5n3DyGOz0dvrsfXGk20cL-UI0gOu28afJ8tPZpcLKxs-wKMH6hQ2she5nf1QUVTuJVqi1AsQ5bdPCZYwHZSxXnikzFSk7Bmt8vZLPie4oeeBRhUnbCilAwHKmYxw0MJzs8XScH_NX62Q.svg",
      },
    ],
    body: {
      height: 173,
    },
    families: ["parents", "younger brother"],
    agency: {
      name: "DR Music",
    },
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
    mbti: "",
    links: [
      {
        type: "instagram",
        link: "https://www.instagram.com/b_fatou_s/",
      },
      {
        type: "twitter",
        link: "https://twitter.com/b_fatou_s",
      },
    ],
  },
  {
    id: "2",
    name: "NVEE",
    thumbnail:
      "https://preview.redd.it/blackswan-nvee-on-instagram-230906-v0-jc2nhfedgqmb1.jpg?width=1169&format=pjpg&auto=webp&s=4ac95ef1cf8c50a672086a0662746e7a6bb58a36",
    realName: "Florence Alena Smith",
    birthday: new Date("1999-01-10"),
    placeOfBirth: "Alexandria, Virginia, USA",
    nationalities: [
      {
        name: "USA",
        thumbnail:
          "https://i.namu.wiki/i/smtSWncrMixjDbdbwxprq6pOhyptuwKoi2ItLzchIz1tSBbc1BG_YGwW5XjHZwv9bwD83G3KUZHbmrY2ZsYWJ0pqKIPnb66JEEqd19PFwZHA9SvRR-ZU4NYqF6ToyndyXobdFXghcoZBwtaFHZ_PoA.svg",
      },
    ],
    body: {
      height: 169,
    },
    families: ["mother", "youngest of 2 sons and 2 daughters", "3 nephews"],
    agency: {
      name: "DR Music",
    },
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
    mbti: "",
    links: [
      {
        type: "instagram",
        link: "https://www.instagram.com/n_v.ee/",
      },
    ],
  },
  {
    id: "3",
    name: "GABI",
    thumbnail:
      "https://i.namu.wiki/i/DFX9FdC9-ayqWaG9E4X8G9F7FbExdVVpX-BA7Iq1u6LBufk6dVtInlH3HE28OfQbfPGJq0cYNcmxLm7zDCtvofUwXodm0hQ36YQ-OlvZyNRXKL0URPE8Yr0-HCwIGqw-hw64JlH5E8VuAIH_j9-LVw.webp",
    realName: "Gabriela Strassburger Dalcin",
    birthday: new Date("2002-11-07"),
    placeOfBirth: "Estado de Santa Catarina, Brasil",
    nationalities: [
      {
        name: "Brasil",
        thumbnail:
          "https://i.namu.wiki/i/IVsnFbOi0ZbVoaRbVoOXjqNRObqrRF71s2Kz-W7Cm8cq5aovk2FeYLRaOw4wz762Qa5Ncy6PIa9MOJehGpoOkFLzTB15K3yGO9OnylupZvZkrpPlZRIlB0TZmaus_Nd2h0RAeR7f4toU30mMb_5yqQ.svg",
      },
      {
        name: "Germany",
        thumbnail:
          "https://i.namu.wiki/i/bdY2-4qImjkaBLZpFg9OIispugWhQpJfzRvJ1nlyWgAjxFUc3D6_2LZEnze7FpdCuV6OXhpWEJuhzf1ArmMX8TSJ_ukvPJN5AT7iDD9KkCtixmCf4VP9J2VOfly1IgSVzgZO6PFTdTASEFKmFwTZcA.svg",
      },
    ],
    body: {
      height: 172,
    },
    families: ["parents", "younger sister"],
    agency: {
      name: "DR Music",
    },
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
    mbti: "ENFP",
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
  },
  {
    id: "4",
    name: "SRIYA",
    thumbnail:
      "https://i.namu.wiki/i/cDrJZ5uNyHGL6cbYBoRqoJeV7-RBVM8xUJ7W93H1T0kYZmxkOmAhQLXdkwAUShCv-wprABGUd7Zs5oU0kydl8bD8R7RiBLQKtoJybKdLdvoYoMP2nicjCyVfcX5WPauIT-57qTxfczI7frGF6nR8GA.webp",
    realName: "Sriya Lenka",
    birthday: new Date("2003-09-15"),
    placeOfBirth: "Odisha, India",
    nationalities: [
      {
        name: "India",
        thumbnail:
          "https://i.namu.wiki/i/8QIOqmUN50VeRmzQyATaOUMfOOJMLDA9O6k_FdMiPq9Yi_gwW41GiTzSgZgu5RpmsFkv1YOMKKuD8yTmzxov33-y6CMy_xpUp8CuDZ0HE2XgkoaoTnxmLdbzHC0RTs6Eo0V4ciajAPEeZkhedt7VUw.svg",
      },
    ],
    body: {
      height: 170,
    },
    families: ["parents", "younger brother", "younger sister"],
    agency: {
      name: "DR Music",
    },
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
    mbti: "",
    links: [
      {
        type: "instagram",
        link: "https://www.instagram.com/sriyalenka.bs/",
      },
    ],
  },
  {
    id: "5",
    name: "JULIE",
    thumbnail:
      "https://i.namu.wiki/i/yP-prE9QnqwASdseFr8k-UKeRNiFJ6xn12n2b7gWnhpOukgsT4UqdNUbcLqfcu5VgOuAzOnWLBzm7IqHjWeFPSZ_ibjOVCzY57C9P7W9dmR4ijo-VNkRw2NdN_dbocs1ic5_jL2vNsS4bpiuUFT3Ww.webp",
    realName: "Julie Han",
    birthday: new Date("2000-03-29"),
    placeOfBirth: "Honolulu, Hawaii, USA",
    nationalities: [
      {
        name: "Korea",
        thumbnail:
          "https://i.namu.wiki/i/uN6KVJhSUX_VXnLdZgzZZmL9fK-tZo9QAbRRiEWXdJwuGYMby_HDAv7Gsae4hRIF6hKtAyMYnwbxgeC7Ds5qbJl0OuO_CwHUM1xLT2SzAv8Dri4LZyolf4dv1YR4110j63GmMf_Vk6dutp_yKV76YA.svg",
      },
      {
        name: "USA",
        thumbnail:
          "https://i.namu.wiki/i/smtSWncrMixjDbdbwxprq6pOhyptuwKoi2ItLzchIz1tSBbc1BG_YGwW5XjHZwv9bwD83G3KUZHbmrY2ZsYWJ0pqKIPnb66JEEqd19PFwZHA9SvRR-ZU4NYqF6ToyndyXobdFXghcoZBwtaFHZ_PoA.svg",
      },
    ],
    body: {
      height: 162,
    },
    families: ["parents"],
    agency: {
      name: "S2 Entertainment",
    },
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
  },
  {
    id: "6",
    name: "NATTY",
    thumbnail:
      "https://i.namu.wiki/i/5DTytOGl4EYRYeDm35BjcT9hfkPKtX8cAwUnTXBs8xfyJjyq5anD8aYvNS2UAlIhst-5ytuXIAfQdf84li7UjRU6prPVQuFKscsrky5dkb99xYEzLsYuO7y_C8ea7CXtk25T1kU8_HeWH66_9sl_Ew.webp",
    realName: "Ahnatchaya Suputhipong",
    birthday: new Date("2000-03-29"),
    placeOfBirth: "Honolulu, Hawaii, USA",
    nationalities: [
      {
        name: "Tailand",
        thumbnail:
          "https://i.namu.wiki/i/mBFE2tVFx672RNf9VOFNp0KZzIOz_-BVhIX3Uu8oIIk9AbMbUdYl2ylzlBUwk1fiZYqA1eTTsfExc_PswbPNeLwEoLk5-ldbEAhQPEksMBI8f9RCwKCI4LiBj9aErH7-BzNAgct7gXuGFCG6U1wGGQ.svg",
      },
    ],
    body: {
      height: 166,
      weight: 46,
      bloodType: "O",
    },
    families: ["parents"],
    agency: {
      name: "S2 Entertainment",
    },
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
      thumbnail:
        "https://i.namu.wiki/i/p-PojL2gmyfUnCF3cM73RAlfdD8hcKzw5KrSx7ONowkeZl8zcTqna9q53FVTl3A32sSbpr1i9bS8JqJ-eCgyI60soGbbvPGL1OF2O5F7oioNgNLKi73XL6tu2PgDlJMoqiCB-FfjbZTDrDZytmVBYg.webp",
    },
    mbti: "INFJ",
    links: [
      {
        type: "twitter",
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
  },
  {
    id: "7",
    name: "BELLE",
    thumbnail:
      "https://i.namu.wiki/i/4qnFBoc4Ds3S2Z9mXjL5Tcqt1J1YZePJXxuJbaj9tu43FODT29mOsSmjFK0FxSQ1UkZhD4YuSOBhHW2ti14wbHo4jXukUJwVGv59KX2oVeacMiBFe8sswBYjmS-CBO4ZvUG5RslD6WMd90jvk0TWbw.webp",
    realName: "Ahnatchaya Suputhipong",
    birthday: new Date("2000-03-29"),
    placeOfBirth: "Honolulu, Hawaii, USA",
    nationalities: [
      {
        name: "Tailand",
        thumbnail:
          "https://i.namu.wiki/i/mBFE2tVFx672RNf9VOFNp0KZzIOz_-BVhIX3Uu8oIIk9AbMbUdYl2ylzlBUwk1fiZYqA1eTTsfExc_PswbPNeLwEoLk5-ldbEAhQPEksMBI8f9RCwKCI4LiBj9aErH7-BzNAgct7gXuGFCG6U1wGGQ.svg",
      },
    ],
    body: {
      height: 166,
      weight: 46,
      bloodType: "O",
    },
    families: ["parents"],
    agency: {
      name: "S2 Entertainment",
    },
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
      thumbnail:
        "https://i.namu.wiki/i/p-PojL2gmyfUnCF3cM73RAlfdD8hcKzw5KrSx7ONowkeZl8zcTqna9q53FVTl3A32sSbpr1i9bS8JqJ-eCgyI60soGbbvPGL1OF2O5F7oioNgNLKi73XL6tu2PgDlJMoqiCB-FfjbZTDrDZytmVBYg.webp",
    },
    mbti: "INFJ",
    links: [
      {
        type: "twitter",
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
  },
  {
    id: "8",
    name: "HANEUL",
    thumbnail:
      "https://i.namu.wiki/i/PxQ_rAfVx5lwFsp7scDXU_Ktsz3102cOW2DSTJsseajrWn3DucbvAjpcHSuLbQD745B1iwuSvi-MrlgB7czhPxPTJH-HaM_C-lf8JDpoAOaXi9Jgqqh1gIJWdNiYcSraCu0v9SjnpfPtW-JlxflOTA.webp",
    realName: "Ahnatchaya Suputhipong",
    birthday: new Date("2000-03-29"),
    placeOfBirth: "Honolulu, Hawaii, USA",
    nationalities: [
      {
        name: "Tailand",
        thumbnail:
          "https://i.namu.wiki/i/mBFE2tVFx672RNf9VOFNp0KZzIOz_-BVhIX3Uu8oIIk9AbMbUdYl2ylzlBUwk1fiZYqA1eTTsfExc_PswbPNeLwEoLk5-ldbEAhQPEksMBI8f9RCwKCI4LiBj9aErH7-BzNAgct7gXuGFCG6U1wGGQ.svg",
      },
    ],
    body: {
      height: 166,
      weight: 46,
      bloodType: "O",
    },
    families: ["parents"],
    agency: {
      name: "S2 Entertainment",
    },
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
      thumbnail:
        "https://i.namu.wiki/i/p-PojL2gmyfUnCF3cM73RAlfdD8hcKzw5KrSx7ONowkeZl8zcTqna9q53FVTl3A32sSbpr1i9bS8JqJ-eCgyI60soGbbvPGL1OF2O5F7oioNgNLKi73XL6tu2PgDlJMoqiCB-FfjbZTDrDZytmVBYg.webp",
    },
    mbti: "INFJ",
    links: [
      {
        type: "twitter",
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
  },
];
