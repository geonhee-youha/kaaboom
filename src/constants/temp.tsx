import { blue, cyan, orange, purple, yellow } from "@mui/material/colors";
import { HomeMainBannerItemProps } from "../components/organisms/HomeMainBanner";
import { CelebProps } from "../components/molecules/CelebItem";
import { ProjectProps } from "../components/molecules/ProjectItem";
import { IdeaProps } from "../components/molecules/IdeaItem";

export const categories = [
  {
    label: "아이돌",
    value: "idol",
    icon: "stars",
    color: purple[500],
  },
  {
    label: "배우",
    value: "actor",
    icon: "user-tie-hair",
    color: orange[500],
  },
  {
    label: "가수",
    value: "singer",
    icon: "microphone-stand",
    color: cyan[500],
  },
  {
    label: "인플루언서",
    value: "influencer",
    icon: "circle-nodes",
    color: blue[500],
  },
  {
    label: "스포츠",
    value: "athlete",
    icon: "medal",
    color: yellow[500],
  },
];

export const artists = [
  {
    id: "1",
    name: "KYUNG SOO DO",
    thumbnail: "/temp/artists/do.webp",
  },
  {
    id: "2",
    name: "ZICO",
    thumbnail: "/temp/artists/zico.webp",
  },
  {
    id: "3",
    name: "CHEN",
    thumbnail: "/temp/artists/chen.webp",
  },
  {
    id: "4",
    name: "BAEKHYUN",
    thumbnail: "/temp/artists/baekhyun.webp",
  },
  {
    id: "5",
    name: "XIUMIN",
    thumbnail: "/temp/artists/xiumin.webp",
  },
];

export const testHomeMainBanner: HomeMainBannerItemProps[] = [
  {
    id: "1",
    thumbnail: "/temp/banner/home-main-1.jpeg",
    title: {
      kr: (
        <>
          당신이 도경수에게
          <br />
          원하는 콘텐츠는?
        </>
      ),
      us: <>What content do you want from Do Kyungsoo?</>,
    },
    description: {
      kr: (
        <>
          아이돌부터 영화배우까지,
          <br />
          완벽주의자 도경수의 다음 콘텐츠는?
        </>
      ),
      us: (
        <>
          From idol to movie star, what will be the next content for
          perfectionist Do Kyung-soo?
        </>
      ),
    },
  },
  {
    id: "1",
    thumbnail: "/temp/banner/home-main-1.jpeg",
    title: {
      kr: (
        <>
          당신이 도경수에게
          <br />
          원하는 콘텐츠는?
        </>
      ),
      us: <>What content do you want from Do Kyungsoo?</>,
    },
    description: {
      kr: (
        <>
          아이돌부터 영화배우까지,
          <br />
          완벽주의자 도경수의 다음 콘텐츠는?
        </>
      ),
      us: (
        <>
          From idol to movie star, what will be the next content for
          perfectionist Do Kyung-soo?
        </>
      ),
    },
  },
  {
    id: "1",
    thumbnail: "/temp/banner/home-main-1.jpeg",
    title: {
      kr: (
        <>
          당신이 도경수에게
          <br />
          원하는 콘텐츠는?
        </>
      ),
      us: <>What content do you want from Do Kyungsoo?</>,
    },
    description: {
      kr: (
        <>
          아이돌부터 영화배우까지,
          <br />
          완벽주의자 도경수의 다음 콘텐츠는?
        </>
      ),
      us: (
        <>
          From idol to movie star, what will be the next content for
          perfectionist Do Kyung-soo?
        </>
      ),
    },
  },
];

const testCategories = [
  {
    label: "K-pop",
    value: "kpop",
    icon: "stars",
  },
  {
    label: "actor",
    value: "kpop",
    icon: "stars",
  },
  {
    label: "K-pop",
    value: "kpop",
    icon: "stars",
  },
];

export const testCelebs: CelebProps[] = [
  {
    id: "1",
    name: { kr: "도경수", us: "KYUNG SOO DO" },
    thumbnail: "/temp/celeb/1.webp",
  },
  {
    id: "2",
    name: { kr: "우지호", us: "ZICO" },
    thumbnail: "/temp/celeb/2.webp",
  },
  {
    id: "6",
    name: { kr: "욘니와 치애", us: "YONNI & CHIAE" },
    thumbnail: "/temp/celeb/6.webp",
  },
  {
    id: "7",
    name: { kr: "손흥민", us: "SON" },
    thumbnail: "/temp/celeb/7.webp",
  },
  {
    id: "8",
    name: { kr: "류승룡", us: "SEUNG RYONG RYU" },
    thumbnail: "/temp/celeb/8.webp",
  },
  {
    id: "3",
    name: { kr: "첸", us: "CHEN" },
    thumbnail: "/temp/celeb/3.webp",
  },
  {
    id: "4",
    name: { kr: "백현", us: "BAEKHYUN" },
    thumbnail: "/temp/celeb/4.webp",
  },
  {
    id: "5",
    name: { kr: "시우민", us: "XIUMIN" },
    thumbnail: "/temp/celeb/5.webp",
  },
];

export const testProjects: ProjectProps[] = [
  {
    id: "1",
    celeb: {
      id: "1",
    },
    thumbnail: "/temp/contents/1.png",
    title: {
      kr: "크리스마스 캐롤 앨범 제작 프로젝트",
      us: "Christmas Carol Album Project",
    },
    description: {
      kr: "이 편지는 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다. 이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내 주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 모르지만 사실입니다.",
      us: "If you have nothing to do now I can offer you a little entertainment – a psychological game. Try it and I hope that you will like it.",
    },
    story: { kr: "", us: "" },
    likeCount: 2640,
    commentCount: 1077,
    viewCount: 18473,
    liked: true,
    dueDate: new Date("2023-12-01"),
    fan: {
      id: "1",
    },
  },
  {
    id: "2",
    celeb: {
      id: "1",
    },
    thumbnail: "/temp/contents/2.jpeg",
    title: {
      kr: "화보 메이킹필름 콘텐츠 프로젝트",
      us: "Pictorial making film content project",
    },
    description: {
      kr: "이 편지는 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다. 이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내 주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 모르지만 사실입니다.",
      us: "If you have nothing to do now I can offer you a little entertainment – a psychological game. Try it and I hope that you will like it.",
    },
    story: { kr: "", us: "" },
    likeCount: 3822,
    commentCount: 934,
    viewCount: 18473,
    liked: false,
    dueDate: new Date("2023-12-01"),
    fan: {
      id: "2",
    },
  },
  {
    id: "3",
    celeb: {
      id: "1",
    },
    thumbnail: "/temp/contents/3.jpg",
    title: {
      kr: "더 문 촬영 및 제작후기 공유 프로젝트",
      us: "The Moon filming and production review sharing project",
    },
    description: {
      kr: "이 편지는 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다. 이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내 주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 모르지만 사실입니다.",
      us: "If you have nothing to do now I can offer you a little entertainment – a psychological game. Try it and I hope that you will like it.",
    },
    story: { kr: "", us: "" },
    likeCount: 1216,
    commentCount: 680,
    viewCount: 18473,
    liked: false,
    dueDate: new Date("2023-12-01"),
    fan: {
      id: "3",
    },
  },
  {
    id: "4",
    celeb: {
      id: "1",
    },
    thumbnail: "",
    title: {
      kr: "경수오빠 저희를 위해서 솔로앨범 내주세요",
      us: "Kyungsoo oppa, please release an album for us",
    },
    description: {
      kr: "이 편지는 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다. 이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내 주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 모르지만 사실입니다.",
      us: "If you have nothing to do now I can offer you a little entertainment – a psychological game. Try it and I hope that you will like it.",
    },
    story: { kr: "", us: "" },
    likeCount: 1580,
    commentCount: 412,
    viewCount: 18473,
    liked: false,
    dueDate: new Date("2023-12-01"),
    fan: {
      id: "4",
    },
  },
  {
    id: "5",
    celeb: {
      id: "1",
    },
    thumbnail: "",
    title: {
      kr: "경수오빠 저희를 위해서 솔로앨범 내주세요",
      us: "Kyungsoo oppa, please release an album for us",
    },
    description: {
      kr: "이 편지는 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다. 이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내 주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 모르지만 사실입니다.",
      us: "If you have nothing to do now I can offer you a little entertainment – a psychological game. Try it and I hope that you will like it.",
    },
    story: { kr: "", us: "" },
    likeCount: 2108,
    commentCount: 477,
    viewCount: 18473,
    liked: false,
    dueDate: new Date("2023-12-01"),
    fan: {
      id: "1",
    },
  },
  {
    id: "6",
    celeb: {
      id: "1",
    },
    thumbnail: "",
    title: {
      kr: "경수오빠 저희를 위해서 솔로앨범 내주세요",
      us: "Kyungsoo oppa, please release an album for us",
    },
    description: {
      kr: "이 편지는 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다. 이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내 주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 모르지만 사실입니다.",
      us: "If you have nothing to do now I can offer you a little entertainment – a psychological game. Try it and I hope that you will like it.",
    },
    story: { kr: "", us: "" },
    likeCount: 2143,
    commentCount: 358,
    viewCount: 18473,
    liked: false,
    dueDate: new Date("2023-12-01"),
    fan: {
      id: "2",
    },
  },
  {
    id: "7",
    celeb: {
      id: "1",
    },
    thumbnail: "",
    title: {
      kr: "경수오빠 저희를 위해서 솔로앨범 내주세요",
      us: "Kyungsoo oppa, please release an album for us",
    },
    description: {
      kr: "이 편지는 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다. 이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내 주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 모르지만 사실입니다.",
      us: "If you have nothing to do now I can offer you a little entertainment – a psychological game. Try it and I hope that you will like it.",
    },
    story: { kr: "", us: "" },
    likeCount: 2912,
    commentCount: 364,
    viewCount: 18473,
    liked: false,
    dueDate: new Date("2023-12-01"),
    fan: {
      id: "3",
    },
  },
];

export const testIdeas: IdeaProps[] = [
  {
    id: "1",
    celeb: {
      id: "1",
    },
    thumbnail: "",
    title: {
      kr: "경수오빠 저희를 위해서 솔로앨범 내주세요",
      us: "Kyungsoo oppa, please release an album for us",
    },
    description: {
      kr: "이 편지는 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다. 이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내 주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 모르지만 사실입니다.",
      us: "If you have nothing to do now I can offer you a little entertainment – a psychological game. Try it and I hope that you will like it.",
    },
    story: { kr: "", us: "" },
    likeCount: 291,
    commentCount: 36,
    viewCount: 1847,
    liked: true,
    writtenDate: new Date("2023-11-07"),
    fan: {
      id: "3",
    },
  },
  {
    id: "2",
    celeb: {
      id: "1",
    },
    thumbnail: "",
    title: {
      kr: "경수오빠 저희를 위해서 솔로앨범 내주세요",
      us: "Kyungsoo oppa, please release an album for us",
    },
    description: {
      kr: "이 편지는 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다. 이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내 주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 모르지만 사실입니다.",
      us: "If you have nothing to do now I can offer you a little entertainment – a psychological game. Try it and I hope that you will like it.",
    },
    story: { kr: "", us: "" },
    likeCount: 291,
    commentCount: 36,
    viewCount: 1847,
    liked: true,
    writtenDate: new Date("2023-11-08"),
    fan: {
      id: "2",
    },
  },
  {
    id: "3",
    celeb: {
      id: "1",
    },
    thumbnail: "",
    title: {
      kr: "경수오빠 저희를 위해서 솔로앨범 내주세요",
      us: "Kyungsoo oppa, please release an album for us",
    },
    description: {
      kr: "이 편지는 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다. 이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내 주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 모르지만 사실입니다.",
      us: "If you have nothing to do now I can offer you a little entertainment – a psychological game. Try it and I hope that you will like it.",
    },
    story: { kr: "", us: "" },
    likeCount: 291,
    commentCount: 36,
    viewCount: 1847,
    liked: true,
    writtenDate: new Date("2023-11-08"),
    fan: {
      id: "2",
    },
  },
  {
    id: "4",
    celeb: {
      id: "1",
    },
    thumbnail: "",
    title: {
      kr: "경수오빠 저희를 위해서 솔로앨범 내주세요",
      us: "Kyungsoo oppa, please release an album for us",
    },
    description: {
      kr: "이 편지는 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다. 이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내 주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 모르지만 사실입니다.",
      us: "If you have nothing to do now I can offer you a little entertainment – a psychological game. Try it and I hope that you will like it.",
    },
    story: { kr: "", us: "" },
    likeCount: 291,
    commentCount: 36,
    viewCount: 1847,
    liked: true,
    writtenDate: new Date("2023-11-08"),
    fan: {
      id: "2",
    },
  },
];
