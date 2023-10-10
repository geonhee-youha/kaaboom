import { LinkProps, NationProps } from ".";

export type AgencyProps = {
  id: string;
  name: string;
  thumbnail: string;
  nation: NationProps;
  establishmentDate: any; //추후 수정 필요
  establisher?: string;
  ceo: string;
  parentCompany?: {
    name: string;
  };
  address: string;
  links: LinkProps[];
};

export const agencies: AgencyProps[] = [
  {
    id: "DRM",
    name: "DR Music",
    thumbnail: "/temp/agencies/drm.png",
    nation: {
      name: "republic of korea",
      thumbnail: "/temp/nations/korea.svg",
    },
    establishmentDate: "1989",

    ceo: "Yoon Deungryong",
    address: "17, Gangnam-daero 160-gil, Gangnam-gu, Seoul, Republic of Korea",
    links: [
      {
        type: "youtube",
        link: "https://www.youtube.com/channel/UCE9y91EhAvdRfm8nzD5SOzw",
      },
    ],
  },
  {
    id: "S2E",
    name: "S2 Entertainment",
    thumbnail: "/temp/agencies/s2e.png",
    nation: {
      name: "republic of korea",
      thumbnail: "/temp/nations/korea.svg",
    },
    establishmentDate: "2020.08.14",
    establisher: "Hong Seungsung",
    ceo: "Hong Taehwa",
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
        type: "x-twitter",
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
  },
  {
    id: "AUR",
    name: "AURA Entertainment",
    thumbnail: "/temp/agencies/aur.png",
    nation: {
      name: "republic of korea",
      thumbnail: "/temp/nations/korea.svg",
    },
    establishmentDate: "2020.12",
    ceo: "Alex Kim",
    parentCompany: {
      name: "S2 Entertainment",
    },
    address: "5, Seolleung-ro 161-gil, Gangnam-gu, Seoul, Republic of Korea",
    links: [
      {
        type: "homepage",
        link: "http://auraent.net/",
      },
      {
        type: "youtube",
        link: "https://www.youtube.com/channel/UC_e-ZKI2ZRS3uBCSv6vzvDw/channels",
      },
      {
        type: "instagram",
        link: "https://www.instagram.com/aura_officialkr",
      },
      {
        type: "x-twitter",
        link: "https://twitter.com/aura_officialkr",
      },
      {
        type: "facebook",
        link: "https://www.facebook.com/auraofficialkr/",
      },
    ],
  },
];
