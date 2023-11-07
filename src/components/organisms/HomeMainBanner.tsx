import { Box, Container, Typography, alpha } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import { useEffect, useState } from "react";
import Visual from "../atoms/Visual";
import { useRouter } from "next/router";
import { grey } from "@mui/material/colors";
import { theme } from "../../themes/theme";

const homeMainBannerHeight = `calc(100vh - 56px - var(--saib))`;
const homeMainBannerItemHeight = `calc((100vh - 56px - var(--saib)) * 0.67)`;
const homeMainBannerContentsHeight = `calc((100vh - 56px - var(--saib)) * 0.67 + 36px)`;

export type HomeMainBannerItemProps = {
  id: string;
  thumbnail: string;
  title: { ko: React.ReactNode; en: React.ReactNode };
  description: { ko: React.ReactNode; en: React.ReactNode };
};

function HomeMainBannerItem({ item }: { item: HomeMainBannerItemProps }) {
  const router = useRouter();
  const { en } = router.query;
  const handleClick = () => {
    router.push(`/celeb/${item.id}`);
  };
  return (
    <Box>
      <Box className="HomeMainBannerItem">
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
        <Typography
          sx={{
            fontSize: 28,
            lineHeight: "36px",
            fontWeight: "700",
          }}
          className="HomeMainBannerContents"
        >
          {en === "true" ? item.title.en : item.title.ko}
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
          {en === "true" ? item.description.en : item.description.ko}
        </Typography>
      </Container>
    </Box>
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
    var headerEl: any = document.querySelector(`.Header`);
    var headerBottomEl: any = document.querySelector(`.HeaderBottom`);
    var targetEl: any = document.querySelector(`.HomeMainBannerContents`);
    var targetEl2: any = document.querySelector(`.HomeContents`);
    var bannerEl: any = document.querySelector(`.HomeMainBanner`);
    var itemEls: any = document.querySelectorAll(`.HomeMainBannerItem`);
    var paginationEl: any = document.querySelector(
      `.HomeMainBanner .swiper-pagination`
    );
    const listener1 = (e: any) => {
      var scrollY = window.scrollY;
      var remainedHeight = targetEl.offsetTop - headerBottomEl.offsetTop;
      var remainedHeight2 = targetEl2.offsetTop - headerBottomEl.offsetTop;
      var variableOpacity = (remainedHeight - scrollY) / remainedHeight;
      var variableColorOpacity: any =
        1 - (remainedHeight - scrollY) / remainedHeight;
      var variableColorOpacity2: any =
        1 - (remainedHeight2 - scrollY) / remainedHeight2;
      headerEl.style.setProperty(
        "background",
        alpha("#121212", variableColorOpacity2 > 1 ? 1 : variableColorOpacity2)
      );
      bannerEl.style.transform = `translateY(-${scrollY / 2}px)`;
      itemEls.forEach(function (el: any) {
        el.style.setProperty("opacity", variableOpacity);
      });
      paginationEl.style.setProperty("opacity", variableOpacity);
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
        sx={{ width: "100%", height: homeMainBannerContentsHeight }}
        className="BannerHeight"
      />
      <Box
        sx={{
          position: "absolute",
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
                background:
                  "linear-gradient(rgba(18, 18, 18, 0.8) 0%, rgba(18, 18, 18, 0.4) 128px, rgba(18, 18, 18, 0.4) calc(((100vh - 56px) * 0.67) / 2), rgba(18, 18, 18, 1) calc(((100vh - 56px) * 0.67) + 240px), rgba(18, 18, 18, 1) 100%)",
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
              height: `36px`,
              transition: "none !important",
            },
            "& .swiper-pagination-bullet": {
              width: "12px",
              height: "4px",
              borderRadius: 0,
              m: "0 4px 0 0 !important",
              backgroundColor: "white",
              "&.swiper-pagination-bullet-active": {
                opacity: 1,
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
