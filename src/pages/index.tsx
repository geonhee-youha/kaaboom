import { Box, Stack, Typography } from "@mui/material";
import { theme } from "../themes/theme";
import { artists } from "../data/artist";
import youhaGrey from "../constants/youhaGrey";
import ArtistItem from "../components/molecules/ArtistItem";
import { agencies } from "../data/agency";
import { groups } from "../data/group";
import GroupItem from "../components/molecules/GroupItem";
import { messages } from "../data/message";
import MessageItem from "../components/molecules/MessageItem";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import IconButton from "../components/atoms/IconButton";

const originalError = console.error;

console.error = (...args) => {
  if (/Warning.*Function components cannot be given refs/.test(args[0])) {
    return;
  }
  originalError.call(console, ...args);
};

export default function Index() {
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [artistSwiper, setArtistSwiper] = useState<any>(null);
  const [artistSwiperIndex, setArtistSwiperIndex] = useState<number>(0);
  const onArtistSlideChange = (swiper: any) => {
    setArtistSwiperIndex(swiper.realIndex);
  };
  const onClickArtistPrev = () => {
    if (artistSwiperIndex === 0) return;
    artistSwiper.slideTo(artistSwiperIndex - 1);
  };
  const onClickArtistNext = () => {
    if (artistSwiperIndex === artists.length - 1) return;
    artistSwiper.slideTo(artistSwiperIndex + 1);
  };
  const [messageSwiper, setMessageSwiper] = useState<any>(null);
  const [messageSwiperIndex, setMessageSwiperIndex] = useState<number>(0);
  const onMessageSlideChange = (swiper: any) => {
    setMessageSwiperIndex(swiper.realIndex);
  };
  const onClickMessagePrev = () => {
    if (messageSwiperIndex === 0) return;
    messageSwiper.slideTo(messageSwiperIndex - 1);
  };
  const onClickMessageNext = () => {
    if (messageSwiperIndex === messages.length - 1) return;
    messageSwiper.slideTo(messageSwiperIndex + 1);
  };
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <Stack
      spacing={4}
      sx={{
        width: `100%`,
        minWidth: "280px",
        maxWidth: `1280px`,
        m: theme.spacing(0, "auto"),
        minHeight: "100vh",
        p: theme.spacing(6, 0),
      }}
    >
      <Stack
        spacing={3}
        className="Section"
        sx={{
          p: theme.spacing(0, 2),
        }}
      >
        <Box
          sx={{
            m: theme.spacing(1, 0),
          }}
          className="SectionTitle"
        >
          <Typography
            sx={{
              fontSize: 28,
              lineHeight: "40px",
              fontWeight: "700",
              textAlign: "center",
              "@media(min-width: 600px)": {
                "& br": {
                  display: "none",
                },
              },
            }}
          >
            Personalized video <br />
            from your favorite artists
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            "& > *": {
              maxWidth: `calc((1280px - 32px - ${12 * (7 - 1)}px) / ${7})`,
              width: `calc((100vw - 32px - ${12 * (3 - 1)}px) / ${3})`,
              mb: `32px`,
              ":not(:first-child)": {
                ml: `11px`,
              },
              "@media(min-width: 480px)": {
                width: `calc((100vw - 32px - ${12 * (4 - 1)}px) / ${4})`,
              },
              "@media(min-width: 600px)": {
                width: `calc((100vw - 32px - ${12 * (5 - 1)}px) / ${5})`,
              },
              "@media(min-width: 720px)": {
                width: `calc((100vw - 32px - ${12 * (6 - 1)}px) / ${6})`,
              },
              "@media(min-width: 840px)": {
                width: `calc((100vw - 32px - ${12 * (7 - 1)}px) / ${7})`,
              },
              "@media(min-width: 1280px)": {
                width: `calc((1280px - 32px - ${12 * (7 - 1)}px) / ${8})`,
              },
            },
          }}
          className="SectionContents"
        >
          {groups.map((item, index) => {
            return <GroupItem key={index} item={item} />;
          })}
        </Box>
      </Stack>
      <Stack
        spacing={2}
        className="Section"
        sx={{
          p: theme.spacing(0, 2),
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              flex: 1,
              fontSize: 20,
              lineHeight: "32px",
              fontWeight: "700",
            }}
          >
            New artists
          </Typography>
          <Stack direction={"row"} spacing={1}>
            <IconButton
              name="angle-left"
              size={20}
              borderColor={youhaGrey[700]}
              backgroundColor={youhaGrey[800]}
              sx={{
                width: 32,
                height: 32,
              }}
              onClick={onClickArtistPrev}
            />
            <IconButton
              name="angle-right"
              size={20}
              borderColor={youhaGrey[700]}
              backgroundColor={youhaGrey[800]}
              sx={{
                width: 32,
                height: 32,
              }}
              onClick={onClickArtistNext}
            />
          </Stack>
        </Box>
        <Box
          sx={{
            "& a": {
              width: "100%",
            },
            pb: 4,
            "@media(max-width: 480px)": {
              ml: `-16px !important`,
              mr: `-16px !important`,
              "& .swiper": {
                pl: 2,
                pr: 2,
              },
            },
          }}
        >
          <Swiper
            onSwiper={setArtistSwiper}
            onSlideChange={onArtistSlideChange}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              480: {
                slidesPerView: 3,
                spaceBetween: 12,
              },
              600: {
                slidesPerView: 4,
                spaceBetween: 12,
              },
              720: {
                slidesPerView: 5,
                spaceBetween: 12,
              },
              840: {
                slidesPerView: 6,
                spaceBetween: 12,
              },
            }}
          >
            {artists.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <ArtistItem item={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      </Stack>
      <Stack
        spacing={2}
        className="Section"
        sx={{
          p: theme.spacing(0, 2),
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              flex: 1,
              fontSize: 20,
              lineHeight: "32px",
              fontWeight: "700",
            }}
          >
            Recent fan messages
          </Typography>
          <Stack direction={"row"} spacing={1}>
            <IconButton
              name="angle-left"
              size={20}
              borderColor={youhaGrey[700]}
              backgroundColor={youhaGrey[800]}
              sx={{
                width: 32,
                height: 32,
              }}
              onClick={onClickMessagePrev}
            />
            <IconButton
              name="angle-right"
              size={20}
              borderColor={youhaGrey[700]}
              backgroundColor={youhaGrey[800]}
              sx={{
                width: 32,
                height: 32,
              }}
              onClick={onClickMessageNext}
            />
          </Stack>
        </Box>
        <Box
          sx={{
            "& a": {
              width: "100%",
            },
            pb: 4,
            "@media(max-width: 480px)": {
              ml: `-16px !important`,
              mr: `-16px !important`,
              "& .swiper": {
                pl: 2,
                pr: 2,
              },
            },
          }}
        >
          <Swiper
            onSwiper={setMessageSwiper}
            onSlideChange={onMessageSlideChange}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              480: {
                slidesPerView: 3,
                spaceBetween: 12,
              },
              600: {
                slidesPerView: 4,
                spaceBetween: 12,
              },
              720: {
                slidesPerView: 5,
                spaceBetween: 12,
              },
              840: {
                slidesPerView: 6,
                spaceBetween: 12,
              },
            }}
          >
            {messages.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <MessageItem
                    item={item}
                    index={index}
                    focusedIndex={focusedIndex}
                    setFocusedIndex={setFocusedIndex}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      </Stack>
    </Stack>
  ) : (
    <Box sx={{ minHeight: "100vh" }} />
  );
}
