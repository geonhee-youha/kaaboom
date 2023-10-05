import { LinkProps, NationProps } from ".";

export type AgencyProps = {
  id: string;
  name: string;
  thumbnail: string;
  nation: NationProps;
  establishmentDate: any; //추후 수정 필요
  establisher?: string;
  ceo: string;
  address: string;
  links: LinkProps[];
  colors: {
    inners: string[];
    borders?: string[];
  };
};

export const agencies: AgencyProps[] = [
  {
    id: "DRM",
    name: "DR Music",
    thumbnail:
      "https://i.namu.wiki/i/apaKojovboAMoge3NVLoJdK-SZ4MlIPWiaS5X2i9n9uA-3R8fsAhKGdjz_vqnlP5Zwm9ot1HuOsYRqGYCfsYUQ.webp",
    nation: {
      name: "republic of korea",
      thumbnail:
        "https://i.namu.wiki/i/uN6KVJhSUX_VXnLdZgzZZmL9fK-tZo9QAbRRiEWXdJwuGYMby_HDAv7Gsae4hRIF6hKtAyMYnwbxgeC7Ds5qbJl0OuO_CwHUM1xLT2SzAv8Dri4LZyolf4dv1YR4110j63GmMf_Vk6dutp_yKV76YA.svg",
    },
    establishmentDate: "1989년",

    ceo: "Deung-ryong Yoon",
    address: "17, Gangnam-daero 160-gil, Gangnam-gu, Seoul, Republic of Korea",
    links: [
      {
        type: "youtube",
        link: "https://www.youtube.com/channel/UCE9y91EhAvdRfm8nzD5SOzw",
      },
    ],
    colors: {
      inners: ["#ffffff"],
    },
  },
  {
    id: "S2E",
    name: "S2 Entertainment",
    thumbnail:
      "https://i.namu.wiki/i/xpSLthD81YuZqBAr8rukkXqa-wJ_0ALp-0D0rNOI51zC11ik25d1z8xDtg9v_xDyauz2DNV5XHS_SvOQLTrKJw5d0zt9r24H-bnDbiGBdYPOdldu6sRUbxmiupASxdEnJv-jSedVIpt_vE_V4xFG4Q.webp",
    nation: {
      name: "republic of korea",
      thumbnail:
        "https://i.namu.wiki/i/uN6KVJhSUX_VXnLdZgzZZmL9fK-tZo9QAbRRiEWXdJwuGYMby_HDAv7Gsae4hRIF6hKtAyMYnwbxgeC7Ds5qbJl0OuO_CwHUM1xLT2SzAv8Dri4LZyolf4dv1YR4110j63GmMf_Vk6dutp_yKV76YA.svg",
    },
    establishmentDate: "2020년 8월 14일",
    establisher: "Seung-sung Hong",
    ceo: "Tae-hwa Hong",
    address: "22, Seolleung-ro 129-gil, Gangnam-gu, Seoul, Republic of Korea",
    links: [
      {
        type: "homepage",
        link: "http://s2ent.co.kr/",
      },
      {
        type: "youtube",
        link: "https://www.youtube.com/channel/UCBRTM1a5mRyBffub8jUa8Fw",
      },
      {
        type: "instagram",
        link: "http://instagram.com/s2ent_official",
      },
      {
        type: "twitter",
        link: "https://twitter.com/S2ent_official",
      },
      {
        type: "facebook",
        link: "http://facebook.com/S2entofficial",
      },
      {
        type: "weibo",
        link: "http://weibo.com/u/7525144523",
      },
    ],
    colors: {
      inners: ["##00c7be"],
    },
  },
];
