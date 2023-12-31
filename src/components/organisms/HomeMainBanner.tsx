import { Box, Container, Typography, alpha } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import { useEffect, useState } from "react";
import Visual from "../atoms/Visual";
import { useRouter } from "next/router";
import { grey } from "@mui/material/colors";
import { theme } from "../../themes/theme";

const homeMainBannerHeight = `calc((100vh - 56px - var(--saib)))`;
const homeMainBannerItemHeight = `calc((100vh - 56px - var(--saib)) * 0.6)`;
export const homeMainBannerContentsHeight = `calc((100vh - 56px - var(--saib)) * 0.6 + 40px)`;

export type HomeMainBannerItemProps = {
  id: string;
  thumbnail: string;
  title: { [key in string]: React.ReactNode };
  description: { [key in string]: React.ReactNode };
};

function HomeMainBannerItem({ item }: { item: HomeMainBannerItemProps }) {
  const router = useRouter();
  const { lang } = router.query;
  const handleClick = () => {
    router.push({
      pathname: `/celebs/${item.id}`,
      query: { ...router.query, lang: lang ?? "kr" },
    });
  };
  return (
    <>
      <Box className="HomeMainBannerItem HomeMainBannerImage">
        <Visual src={item.thumbnail} absolute top forceShow />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: homeMainBannerHeight,
        }}
      />
      <Container
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: homeMainBannerItemHeight,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
        onClick={handleClick}
        className="HomeMainBannerItem"
      >
        <Box className="HomeMainBannerText">
          <Typography
            sx={{
              fontSize: 28,
              lineHeight: "36px",
              fontWeight: "700",
            }}
          >
            {item.title[lang?.toString() ?? "kr"]}
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              lineHeight: "20px",
              color: grey[400],
              fontWeight: "300",
              m: theme.spacing(1, 0, 0, 0),
            }}
          >
            {item.description[lang?.toString() ?? "kr"]}
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default function HomeMainBanner({
  data,
}: {
  data: HomeMainBannerItemProps[];
}) {
  const [swiper, setSwiper] = useState<SwiperCore>();
  const handleSlideChange = () => {};
  useEffect(() => {
    var headerBackgroundEl: any = document.querySelector(`.HeaderBackground`);
    var contentsEls: any = document.querySelectorAll(`.HomeMainBannerText`);
    var targetContentsEl: any = document.querySelector(`.HomeContents`);
    var targetLineEl: any = document.querySelector(`.TargetLine`);
    var imageEls: any = document.querySelectorAll(
      `.HomeMainBannerImage .ImageContainer`
    );
    var itemEls: any = document.querySelectorAll(`.HomeMainBannerItem`);
    var paginationEl: any = document.querySelector(
      `.HomeMainBanner .swiper-pagination`
    );
    const listener1 = (e: any) => {
      var scrollY = Number(window.scrollY.toFixed(0));
      var targetLineOffsetBottom = targetLineEl.getBoundingClientRect().bottom;
      var targetOffsetTop = targetContentsEl.getBoundingClientRect().top;
      var backgroundOpacity: number = Number(
        (targetOffsetTop / targetLineOffsetBottom).toPrecision(2)
      );
      var headerBlur: number = Number(
        (1 - targetOffsetTop / targetLineOffsetBottom).toPrecision(2)
      );
      headerBackgroundEl.style.setProperty(
        "background",
        alpha("#121212", headerBlur > 1 ? 1 : headerBlur < 0 ? 0 : headerBlur)
      );
      imageEls.forEach(function (el: any) {
        el.style.transform = `translateY(-${scrollY / 3}px)`;
      });
      contentsEls.forEach(function (el: any) {
        el.style.transform = `translateY(-${scrollY / 2}px)`;
      });
      paginationEl.style.transform = `translateY(-${scrollY / 3}px)`;
      itemEls.forEach(function (el: any) {
        el.style.setProperty(
          "opacity",
          backgroundOpacity > 1 ? 1 : backgroundOpacity < 0 ? 0 : backgroundOpacity
        );
      });
      paginationEl.style.setProperty(
        "opacity",
        backgroundOpacity > 1 ? 1 : backgroundOpacity < 0 ? 0 : backgroundOpacity
      );
      console.log(targetOffsetTop, targetLineOffsetBottom);
    };
    window.addEventListener("scroll", listener1);
    window.addEventListener("resize", listener1);
    return () => {
      window.removeEventListener("scroll", listener1);
      window.removeEventListener("resize", listener1);
    };
  }, []);
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: homeMainBannerContentsHeight,
        }}
      />
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: homeMainBannerContentsHeight,
        }}
        className="TargetLine"
      />
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
        }}
        className="HomeMainBanner"
      >
        <Container
          sx={{
            p: `0 !important`,
            height: homeMainBannerHeight,
            "& .swiper": {
              width: "100%",
              height: "100%",
              touchAction: "manipulation",
            },
            "& .mainSwiper .swiper-slide": {
              position: "relative",
              overflow: "visible",
              "&:after": {
                position: "absolute",
                content: '""',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 2,
                // background:
                //   "linear-gradient(rgba(18, 18, 18, 0.8) 0%, rgba(18, 18, 18, 0.4) calc((100vh - 56px) * 0.2), rgba(18, 18, 18, 0.6) calc((100vh - 56px) * 0.4), rgba(18, 18, 18, 1) calc((100vh - 56px) * 0.8), rgba(18, 18, 18, 1) 100%)",
                background:
                  "linear-gradient(rgba(18, 18, 18, 0.8) 0%, rgba(18, 18, 18, 0.4) calc((100vh - 56px) * 0.2), rgba(18, 18, 18, 0.8) 100%)",
              },
            },
            "& .swiper-pagination": {
              top: homeMainBannerItemHeight,
              lineHeight: 0,
              p: theme.spacing(2, 2),
              textAlign: "left",
              "@media(min-width: 600px)": {
                p: theme.spacing(2, 3),
              },
              height: `40px`,
              transition: "none !important",
            },
            "& .swiper-pagination-bullet": {
              width: "6px",
              height: "6px",
              borderRadius: 2,
              backgroundColor: "white",
              transition: `all 0.5s ease`,
              m: `0 4px 0 0 !important`,
              opacity: `0.4 !important`,
              "&.swiper-pagination-bullet-active": {
                opacity: `1 !important`,
                width: "24px",
              },
            },
            "& video": {
              position: "absolute",
              top: 0,
              left: 0,
              objectFit: "cover",
              zIndex: -1,
            },
          }}
        >
          <Box className="mainSwiper swiper">
            <Swiper
              onSwiper={setSwiper}
              onSlideChange={handleSlideChange}
              modules={[Pagination]}
              pagination={{
                clickable: false,
              }}
              spaceBetween={8}
              loop
            >
              {data.map((item, key) => (
                <SwiperSlide key={key}>
                  <HomeMainBannerItem item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Container>
      </Box>
    </>
  );
}
