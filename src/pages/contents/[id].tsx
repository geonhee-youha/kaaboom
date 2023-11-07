import { useRouter } from "next/router";
import BackHeader from "../../components/organisms/BackHeader";
import { testCelebs, testContents } from "../home";
import Visual from "../../components/atoms/Visual";
import _ from "lodash";
import { Box, Container, alpha } from "@mui/material";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();
  const { id, en } = router.query;
  const contents =
    testContents[_.findIndex(testContents, (el) => el.id === id)];
  return (
    <>
      <BackHeader />
      {contents && <Page />}
    </>
  );
}

function Page() {
  const router = useRouter();
  const { id, en } = router.query;
  const contents =
    testContents[_.findIndex(testContents, (el) => el.id === id)];
  const celeb =
    testCelebs[_.findIndex(testCelebs, (el) => el.id === contents.celeb.id)];
  useEffect(() => {
    var headerEl: any = document.querySelector(`.HeaderBackground`);
    var headerBottomEl: any = document.querySelector(`.HeaderBottom`);
    var swiperLineEl: any = document.querySelector(`.SwiperLine`);
    var contentsEls: any = document.querySelectorAll(`.HomeMainBannerText`);
    var contentsEl2: any = document.querySelector(`.HomeContents`);
    var imageEls: any = document.querySelectorAll(
      `.HomeMainBannerImage .ImageContainer`
    );
    var bannerEl: any = document.querySelector(`.HomeMainBanner`);
    var itemEls: any = document.querySelectorAll(`.HomeMainBannerItem`);
    var paginationEl: any = document.querySelector(
      `.HomeMainBanner .swiper-pagination`
    );
    const listener1 = (e: any) => {
      var scrollY = window.scrollY;
      var remainedHeight = swiperLineEl.offsetTop - headerBottomEl.offsetTop;
      var remainedHeight2 = contentsEl2.offsetTop - headerBottomEl.offsetTop;
      var variableOpacity =
        (remainedHeight * 0.75 - scrollY) / (remainedHeight * 0.75);
      var variableColorOpacity2: any =
        1 - (remainedHeight2 - scrollY) / remainedHeight2;
      headerEl.style.setProperty(
        "background",
        alpha(
          "#121212",
          variableColorOpacity2 > 0.8 ? 0.8 : variableColorOpacity2
        )
      );
      headerEl.style.setProperty(
        "backdrop-filter",
        `blur(${
          8 * (variableColorOpacity2 > 1 ? 1 : variableColorOpacity2).toFixed(0)
        }px)`
      );
      imageEls.forEach(function (el: any) {
        el.style.transform = `translateY(${scrollY / 2}px)`;
      });
      contentsEls.forEach(function (el: any) {
        el.style.transform = `translateY(${scrollY / 3}px)`;
      });
      itemEls.forEach(function (el: any) {
        el.style.setProperty("opacity", variableOpacity);
      });
      paginationEl.style.setProperty("opacity", variableOpacity);
      paginationEl.style.transform = `translateY(${scrollY / 2}px)`;
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
      <Container>
        <Box sx={{ position: "absolute", top: 0, left: 0, right: 0 }}>
          <Box
            sx={{
              position: "relative",
              aspectRatio: `10 / 16`,
            }}
          >
            <Visual src={contents.thumbnail} absolute />
          </Box>
        </Box>
        <Box sx={{ height: '200vh'}} className="HomeContents"/>
      </Container>
    </>
  );
}
