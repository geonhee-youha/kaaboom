import { Box, ButtonBase, Container, Typography } from "@mui/material";
import HomeMainBanner, {
  homeMainBannerContentsHeight,
} from "../../components/organisms/HomeMainBanner";
import { theme } from "../../themes/theme";
import { useState } from "react";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import CelebItem from "../../components/molecules/CelebItem";
import ProjectItem from "../../components/molecules/ProjectItem";
import IdeaItem from "../../components/molecules/IdeaItem";
import { grey } from "@mui/material/colors";
import Icon from "../../components/atoms/Icon";
import {
  testCelebs,
  testHomeMainBanner,
  testIdeas,
  testProjects,
} from "../../constants/temp";

export default function Home() {
  const router = useRouter();
  const { lang } = router.query;
  return (
    <>
      <HomeMainBanner data={testHomeMainBanner} />
      <Container>
        <Box
          sx={{
            position: "absolute",
            top: homeMainBannerContentsHeight,
            left: 0,
            right: 0,
            background:
              "linear-gradient(rgba(18, 18, 18, 0) 0%, rgba(18, 18, 18, 1) 120px)",
            bottom: 0,
            zIndex: 98,
          }}
        />
        <Box
          sx={{
            position: "relative",
            height: "200vh",
            zIndex: 99,
          }}
          className="HomeContents"
        >
          <ProjectSection />
          <IdeaSection />
          <CelebSection />
        </Box>
      </Container>
    </>
  );
}

function ProjectSection() {
  const router = useRouter();
  const { lang } = router.query;
  const [swiper, setSwiper] = useState<SwiperCore>();
  const handleSlideChange = () => {};
  const handleClickViewAll = () => {
    router.push({ pathname: "/projects", query: router.query });
  };
  return (
    <Box>
      <Box
        sx={{
          p: theme.spacing(8, 0, 0, 0),
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          className="SectionHeader"
        >
          <Box
            sx={{
              flex: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                lineHeight: "24px",
                fontWeight: "700",
              }}
            >
              {lang === "us"
                ? "Currently preparing projects"
                : "지금 준비중인 프로젝트"}
            </Typography>
          </Box>
          <ButtonBase
            disableRipple
            sx={{
              alignItems: "center",
            }}
            onClick={handleClickViewAll}
          >
            <Typography
              sx={{
                fontSize: 12,
                lineHeight: "16px",
                color: grey[600],
              }}
            >
              {lang === "us" ? "View all" : "전체보기"}
            </Typography>
            <Icon
              name="angle-right"
              prefix="far"
              color={grey[600]}
              size={12}
              sx={{
                m: theme.spacing(0, 0, 0, 0),
              }}
            />
          </ButtonBase>
        </Box>
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
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 8,
              },
              120: {
                slidesPerView: 1,
                spaceBetween: 8,
              },
              240: {
                slidesPerView: 1,
                spaceBetween: 8,
              },
              360: {
                slidesPerView: 2,
                spaceBetween: 8,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 8,
              },
              600: {
                slidesPerView: 3,
                spaceBetween: 12,
              },
              720: {
                slidesPerView: 3,
                spaceBetween: 12,
              },
              840: {
                slidesPerView: 4,
                spaceBetween: 12,
              },
              960: {
                slidesPerView: 4,
                spaceBetween: 12,
              },
              1080: {
                slidesPerView: 5,
                spaceBetween: 12,
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 12,
              },
            }}
            // breakpoints={{
            //   0: {
            //     slidesPerView: 1,
            //     spaceBetween: 8,
            //   },
            //   240: {
            //     slidesPerView: 1,
            //     spaceBetween: 8,
            //   },
            //   480: {
            //     slidesPerView: 1,
            //     spaceBetween: 8,
            //   },
            //   720: {
            //     slidesPerView: 2,
            //     spaceBetween: 12,
            //   },
            //   840: {
            //     slidesPerView: 3,
            //     spaceBetween: 12,
            //   },
            //   1200: {
            //     slidesPerView: 4,
            //     spaceBetween: 12,
            //   },
            // }}
          >
            {testProjects.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <ProjectItem item={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      </Box>
    </Box>
  );
}

function IdeaSection() {
  const router = useRouter();
  const { lang } = router.query;
  const [swiper, setSwiper] = useState<SwiperCore>();
  const handleSlideChange = () => {};
  const handleClickViewAll = () => {
    router.push({ pathname: "/ideas", query: router.query });
  };
  return (
    <Box>
      <Box
        sx={{
          p: theme.spacing(8, 0, 0, 0),
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          className="SectionHeader"
        >
          <Box
            sx={{
              flex: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                lineHeight: "24px",
                fontWeight: "700",
              }}
            >
              {lang === "us"
                ? "Real-time popular ideas"
                : "실시간 인기 아이디어"}
            </Typography>
          </Box>
          <ButtonBase
            disableRipple
            sx={{
              alignItems: "center",
            }}
            onClick={handleClickViewAll}
          >
            <Typography
              sx={{
                fontSize: 12,
                lineHeight: "16px",
                color: grey[600],
              }}
            >
              {lang === "us" ? "View all" : "전체보기"}
            </Typography>
            <Icon
              name="angle-right"
              prefix="far"
              color={grey[600]}
              size={12}
              sx={{
                m: theme.spacing(0, 0, 0, 0),
              }}
            />
          </ButtonBase>
        </Box>
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
              120: {
                slidesPerView: 1,
                spaceBetween: 8,
              },
              240: {
                slidesPerView: 1,
                spaceBetween: 8,
              },
              360: {
                slidesPerView: 1,
                spaceBetween: 8,
              },
              480: {
                slidesPerView: 1,
                spaceBetween: 8,
              },
              600: {
                slidesPerView: 1,
                spaceBetween: 12,
              },
              720: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              840: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              960: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              1080: {
                slidesPerView: 3,
                spaceBetween: 12,
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 12,
              },
            }}
          >
            {testIdeas.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <IdeaItem item={item} type="home" />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      </Box>
    </Box>
  );
}

function CelebSection() {
  const router = useRouter();
  const { lang } = router.query;
  const [swiper, setSwiper] = useState<SwiperCore>();
  const handleSlideChange = () => {};
  const handleClickViewAll = () => {
    router.push({ pathname: "/celebs", query: router.query });
  };
  return (
    <Box>
      <Box
        sx={{
          p: theme.spacing(8, 0, 0, 0),
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          className="SectionHeader"
        >
          <Box
            sx={{
              flex: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                lineHeight: "24px",
                fontWeight: "700",
              }}
            >
              {lang === "us" ? "Currently hot celebs" : "최근 인기 셀럽"}
            </Typography>
          </Box>
          <ButtonBase
            disableRipple
            sx={{
              alignItems: "center",
            }}
            onClick={handleClickViewAll}
          >
            <Typography
              sx={{
                fontSize: 12,
                lineHeight: "16px",
                color: grey[600],
              }}
            >
              {lang === "us" ? "View all" : "전체보기"}
            </Typography>
            <Icon
              name="angle-right"
              prefix="far"
              color={grey[600]}
              size={12}
              sx={{
                m: theme.spacing(0, 0, 0, 0),
              }}
            />
          </ButtonBase>
        </Box>
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
            display: "none",
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
                slidesPerView: 2,
                spaceBetween: 8,
              },
              120: {
                slidesPerView: 2,
                spaceBetween: 8,
              },
              240: {
                slidesPerView: 3,
                spaceBetween: 8,
              },
              360: {
                slidesPerView: 2,
                spaceBetween: 8,
              },
              480: {
                slidesPerView: 3,
                spaceBetween: 8,
              },
              600: {
                slidesPerView: 3,
                spaceBetween: 12,
              },
              720: {
                slidesPerView: 4,
                spaceBetween: 12,
              },
              840: {
                slidesPerView: 4,
                spaceBetween: 12,
              },
              960: {
                slidesPerView: 5,
                spaceBetween: 12,
              },
              1080: {
                slidesPerView: 5,
                spaceBetween: 12,
              },
              1200: {
                slidesPerView: 6,
                spaceBetween: 12,
              },
            }}
          >
            {testCelebs.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <CelebItem item={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
        <Box
          sx={{
            m: theme.spacing(2, 0, 0, 0),
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridAutoRows: "1fr",
            gridTemplateRows: "auto",
            gridColumnGap: 8,
            gridRowGap: 16,
            "@media(min-width: 480px)": {
              gridTemplateColumns: `repeat(4, 1fr)`,
            },
            "@media(min-width: 600px)": {
              gridTemplateColumns: `repeat(4, 1fr)`,
              gridColumnGap: 12,
              gridRowGap: 24,
            },
            "@media(min-width: 720px)": {
              gridTemplateColumns: `repeat(5, 1fr)`,
            },
            "@media(min-width: 840px)": {
              gridTemplateColumns: `repeat(5, 1fr)`,
            },
            "@media(min-width: 960px)": {
              gridTemplateColumns: `repeat(6, 1fr)`,
            },
            "@media(min-width: 1080px)": {
              gridTemplateColumns: `repeat(6, 1fr)`,
            },
            "@media(min-width: 1200px)": {
              gridTemplateColumns: `repeat(7, 1fr)`,
            },
          }}
        >
          {testCelebs.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <CelebItem item={item} />
              </SwiperSlide>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
