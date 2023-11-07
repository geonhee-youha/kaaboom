import { Box, Container, Typography } from "@mui/material";
import HomeMainBanner, {
  HomeMainBannerItemProps, homeMainBannerContentsHeight,
} from "../../components/organisms/HomeMainBanner";
import { theme } from "../../themes/theme";
import { useEffect, useRef, useState } from "react";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/router";
import ContentsItem, {
  ContentsProps,
} from "../../components/molecules/ContentsItem";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import { CelebProps } from "../../components/molecules/CelebItem";

const testHomeMainBanner: HomeMainBannerItemProps[] = [
  {
    id: "1",
    thumbnail: "/temp/banner/home-main-1.jpeg",
    title: {
      ko: (
        <>
          당신이 도경수에게
          <br />
          원하는 콘텐츠는?
        </>
      ),
      en: <>What content do you want from Do Kyungsoo?</>,
    },
    description: {
      ko: (
        <>
          아이돌부터 영화배우까지,
          <br />
          완벽주의자 도경수의 다음 콘텐츠는?
        </>
      ),
      en: (
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
      ko: (
        <>
          당신이 도경수에게
          <br />
          원하는 콘텐츠는?
        </>
      ),
      en: <>What content do you want from Do Kyungsoo?</>,
    },
    description: {
      ko: (
        <>
          아이돌부터 영화배우까지,
          <br />
          완벽주의자 도경수의 다음 콘텐츠는?
        </>
      ),
      en: (
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
      ko: (
        <>
          당신이 도경수에게
          <br />
          원하는 콘텐츠는?
        </>
      ),
      en: <>What content do you want from Do Kyungsoo?</>,
    },
    description: {
      ko: (
        <>
          아이돌부터 영화배우까지,
          <br />
          완벽주의자 도경수의 다음 콘텐츠는?
        </>
      ),
      en: (
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
    name: { ko: "도경수", en: "D.O." },
    thumbnail: "/temp/celeb/1.webp",
  },
];

export const testContents: ContentsProps[] = [
  {
    id: "1",
    celeb: {
      id: "1",
    },
    thumbnail: "/temp/contents/1.png",
    title: {
      ko: "경수오빠 저희를 위해서 솔로앨범 내주세요",
      en: "Kyungsoo oppa, please release an album for us",
    },
    description: {
      ko: "이 편지는 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다. 이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내 주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 모르지만 사실입니다.",
      en: "If you have nothing to do now I can offer you a little entertainment – a psychological game. Try it and I hope that you will like it.",
    },
    story: { ko: "", en: "" },
    likeCount: 24,
    commentCount: 0,
    liked: true,
  },
  {
    id: "2",
    celeb: {
      id: "1",
    },
    thumbnail: "/temp/contents/2.jpeg",
    title: {
      ko: "경수오빠 저희를 위해서 솔로앨범 내주세요",
      en: "Kyungsoo oppa, please release an album for us",
    },
    description: {
      ko: "이 편지는 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다. 이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내 주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 모르지만 사실입니다.",
      en: "If you have nothing to do now I can offer you a little entertainment – a psychological game. Try it and I hope that you will like it.",
    },
    story: { ko: "", en: "" },
    likeCount: 3,
    commentCount: 1,
    liked: false,
  },
  {
    id: "3",
    celeb: {
      id: "1",
    },
    thumbnail: "/temp/contents/3.jpg",
    title: {
      ko: "경수오빠 저희를 위해서 솔로앨범 내주세요",
      en: "Kyungsoo oppa, please release an album for us",
    },
    description: {
      ko: "이 편지는 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다. 이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내 주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 모르지만 사실입니다.",
      en: "If you have nothing to do now I can offer you a little entertainment – a psychological game. Try it and I hope that you will like it.",
    },
    story: { ko: "", en: "" },
    likeCount: 12,
    commentCount: 6,
    liked: false,
  },
  {
    id: "4",
    celeb: {
      id: "1",
    },
    thumbnail: "",
    title: {
      ko: "경수오빠 저희를 위해서 솔로앨범 내주세요",
      en: "Kyungsoo oppa, please release an album for us",
    },
    description: {
      ko: "이 편지는 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다. 이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내 주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 모르지만 사실입니다.",
      en: "If you have nothing to do now I can offer you a little entertainment – a psychological game. Try it and I hope that you will like it.",
    },
    story: { ko: "", en: "" },
    likeCount: 15,
    commentCount: 4,
    liked: false,
  },
  {
    id: "5",
    celeb: {
      id: "1",
    },
    thumbnail: "",
    title: {
      ko: "경수오빠 저희를 위해서 솔로앨범 내주세요",
      en: "Kyungsoo oppa, please release an album for us",
    },
    description: {
      ko: "이 편지는 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다. 이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내 주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 모르지만 사실입니다.",
      en: "If you have nothing to do now I can offer you a little entertainment – a psychological game. Try it and I hope that you will like it.",
    },
    story: { ko: "", en: "" },
    likeCount: 2,
    commentCount: 3,
    liked: false,
  },
  {
    id: "6",
    celeb: {
      id: "1",
    },
    thumbnail: "",
    title: {
      ko: "경수오빠 저희를 위해서 솔로앨범 내주세요",
      en: "Kyungsoo oppa, please release an album for us",
    },
    description: {
      ko: "이 편지는 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다. 이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내 주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 모르지만 사실입니다.",
      en: "If you have nothing to do now I can offer you a little entertainment – a psychological game. Try it and I hope that you will like it.",
    },
    story: { ko: "", en: "" },
    likeCount: 2,
    commentCount: 3,
    liked: false,
  },
  {
    id: "7",
    celeb: {
      id: "1",
    },
    thumbnail: "",
    title: {
      ko: "경수오빠 저희를 위해서 솔로앨범 내주세요",
      en: "Kyungsoo oppa, please release an album for us",
    },
    description: {
      ko: "이 편지는 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다. 이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내 주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 모르지만 사실입니다.",
      en: "If you have nothing to do now I can offer you a little entertainment – a psychological game. Try it and I hope that you will like it.",
    },
    story: { ko: "", en: "" },
    likeCount: 2,
    commentCount: 3,
    liked: false,
  },
];

export default function App() {
  const router = useRouter();
  const { en } = router.query;
  return (
    <>
      <Container>
        <HomeMainBanner data={testHomeMainBanner} />
        <Box
          sx={{
            position: "absolute",
            top: homeMainBannerContentsHeight,
            left: 0,
            right: 0,
            background:
              "linear-gradient(rgba(18, 18, 18, 0) 0%, rgba(18, 18, 18, 1) 120px)",
            bottom: 0,
            zIndex: 98
          }}
        />
        <Box
          sx={{
            position: "relative",
            height: "200vh",
            m: theme.spacing(0, -2),
            "@media(min-width: 600px)": {
              m: theme.spacing(0, -3),
            },
            zIndex: 99,
          }}
          className="HomeContents"
        >
          <Section />
        </Box>
      </Container>
    </>
  );
}

function Section() {
  const router = useRouter();
  const { en } = router.query;
  const [swiper, setSwiper] = useState<SwiperCore>();
  const handleSlideChange = () => {};
  return (
    <Box
      sx={{
        p: theme.spacing(0, 2),
        "@media(min-width: 600px)": {
          p: theme.spacing(0, 3),
        },
      }}
    >
      <Box
        sx={{
          p: theme.spacing(8, 0, 0, 0),
        }}
      >
        <Typography
          sx={{
            fontSize: 16,
            lineHeight: "24px",
            fontWeight: "700",
          }}
        >
          {en === "true"
            ? "Currently recruited contents"
            : "지금 모집중인 콘텐츠"}
        </Typography>
        <Box
          sx={{
            m: theme.spacing(2, -2, 0, -2),
            "@media(min-width: 600px)": {
              m: theme.spacing(2, -3, 0, -3),
            },
            "& .swiper": {
              p: theme.spacing(0, 2),
              "@media(min-width: 600px)": {
                p: theme.spacing(0, 3),
              },
            },
          }}
        >
          <Swiper
            onSwiper={setSwiper}
            onSlideChange={handleSlideChange}
            // breakpoints={{
            //   0: {
            //     slidesPerView: 1,
            //     spaceBetween: 8,
            //   },
            //   240: {
            //     slidesPerView: 2,
            //     spaceBetween: 8,
            //   },
            //   480: {
            //     slidesPerView: 3,
            //     spaceBetween: 8,
            //   },
            //   720: {
            //     slidesPerView: 3,
            //     spaceBetween: 12,
            //   },
            //   840: {
            //     slidesPerView: 4,
            //     spaceBetween: 12,
            //   },
            //   1200: {
            //     slidesPerView: 5,
            //     spaceBetween: 12,
            //   },
            // }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 8,
              },
              240: {
                slidesPerView: 2,
                spaceBetween: 8,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 8,
              },
              720: {
                slidesPerView: 3,
                spaceBetween: 12,
              },
              840: {
                slidesPerView: 4,
                spaceBetween: 12,
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 12,
              },
            }}
          >
            {testContents.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <ContentsItem item={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      </Box>
    </Box>
  );
}
