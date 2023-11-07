import { Box, Container, Typography } from "@mui/material";
import HomeMainBanner, {
  HomeMainBannerItemProps,
} from "../../components/organisms/HomeMainBanner";
import { theme } from "../../themes/theme";
import { useEffect, useRef } from "react";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/router";

const testHomeMainBanner: HomeMainBannerItemProps[] = [
  {
    id: "1",
    thumbnail: "/temp/celeb/1.jpeg",
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
    thumbnail: "/temp/celeb/1.jpeg",
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
    thumbnail: "/temp/celeb/1.jpeg",
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

export default function App() {
  const router = useRouter();
  const { en } = router.query;
  return (
    <>
      <Container>
        <HomeMainBanner data={testHomeMainBanner} />
        <Box
          sx={{
            position: "relative",
            height: "200vh",
            m: theme.spacing(0, -2),
            "@media(min-width: 600px)": {
              m: theme.spacing(0, -3),
            },
            zIndex: 99
          }}
          className="HomeContents"
        >
          <Box
            sx={{
              p: theme.spacing(0, 2),
              "@media(min-width: 600px)": {
                p: theme.spacing(0, 3),
              },
              zIndex: 2,
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
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
