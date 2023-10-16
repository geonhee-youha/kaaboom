import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { theme } from "../themes/theme";
import { artists } from "../data/artist";
import youhaGrey from "../constants/youhaGrey";
import ArtistItem from "../components/molecules/ArtistItem";
import { groups } from "../data/group";
import GroupItem from "../components/molecules/GroupItem";
import { messages } from "../data/message";
import MessageItem from "../components/molecules/MessageItem";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import IconButton from "../components/atoms/IconButton";
import Page from "../components/atoms/Page";
import { reviews } from "../data/review";
import Typo from "../components/atoms/Typo";
import Icon from "../components/atoms/Icon";
import youhaBlue from "../constants/youhaBlue";
import { howKaboomWorks } from "../data";
import { agencies } from "../data/agency";
import AgencyItem from "../components/molecules/AgencyItem";
import Link from "next/link";

const originalError = console.error;

console.error = (...args) => {
  if (/Warning.*Function components cannot be given refs/.test(args[0])) {
    return;
  }
  originalError.call(console, ...args);
};

export default function Index() {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
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
  const [reviewSwiper, setReviewSwiper] = useState<any>(null);
  const [reviewSwiperIndex, setReviewSwiperIndex] = useState<number>(0);
  const onReviewSlideChange = (swiper: any) => {
    setReviewSwiperIndex(swiper.realIndex);
  };
  const onClickReviewPrev = () => {
    if (reviewSwiperIndex === 0) return;
    reviewSwiper.slideTo(reviewSwiperIndex - 1);
  };
  const onClickReviewNext = () => {
    if (reviewSwiperIndex === reviews.length - 1) return;
    reviewSwiper.slideTo(reviewSwiperIndex + 1);
  };
  return (
    <Page>
      <Stack
        spacing={3}
        className="Section"
        sx={{
          p: theme.spacing(6, 2, 3, 2),
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
              ":not(:nth-of-type(1))": {
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
          p: theme.spacing(6, 2, 3, 2),
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
          p: theme.spacing(6, 2, 3, 2),
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
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                  />
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
          p: theme.spacing(6, 2, 3, 2),
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
            Recent reviews
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
              onClick={onClickReviewPrev}
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
              onClick={onClickReviewNext}
            />
          </Stack>
        </Box>
        <Box
          sx={{
            "& a": {
              width: "100%",
            },
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
            onSwiper={setReviewSwiper}
            onSlideChange={onReviewSlideChange}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 12,
              },
              480: {
                slidesPerView: 1,
                spaceBetween: 12,
              },
              600: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              720: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              840: {
                slidesPerView: 3,
                spaceBetween: 12,
              },
              960: {
                slidesPerView: 3,
                spaceBetween: 12,
              },
              1080: {
                slidesPerView: 4,
                spaceBetween: 12,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 12,
              },
            }}
          >
            {reviews.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <Box
                    sx={{
                      backgroundColor: youhaGrey[700],
                      borderRadius: 1,
                      p: theme.spacing(2),
                    }}
                  >
                    <Stack
                      direction={"row"}
                      spacing={1}
                      alignItems={"center"}
                      sx={{ mb: 0.5 }}
                    >
                      <Typography
                        sx={{
                          fontSize: 14,
                          lineHeight: `20px`,
                          fontWeight: "700",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Icon
                        name="thumbs-up"
                        color={youhaBlue[500]}
                        prefix="fas"
                        size={20}
                      />
                    </Stack>
                    <Typography
                      sx={{
                        fontSize: 14,
                        lineHeight: `20px`,
                        m: theme.spacing(0, 0, 2, 0),
                      }}
                    >
                      {item.date}
                      {" / "}
                      {item.type}
                    </Typography>
                    <Typo
                      lines={4}
                      sx={{
                        fontSize: 14,
                        lineHeight: `20px`,
                        color: youhaGrey[200],
                      }}
                    >
                      {item.contents}
                    </Typo>
                  </Box>
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
          p: theme.spacing(6, 2, 3, 2),
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
            How KAABOOM works
          </Typography>
        </Box>
        <Box
          sx={{
            "& a": {
              width: "100%",
            },
            "@media(max-width: 480px)": {
              ml: `-16px !important`,
              mr: `-16px !important`,
              "& .swiper": {
                pl: 2,
                pr: 2,
              },
            },
            "& .swiper-slide": {
              width: "100%",
              height: "auto !important",
              display: "flex",
              alignSelf: "stretch !important",
              justifySelf: "stretch !important",
            },
          }}
        >
          <Swiper
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 12,
              },
              480: {
                slidesPerView: 1,
                spaceBetween: 12,
              },
              600: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              720: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              840: {
                slidesPerView: 3,
                spaceBetween: 12,
              },
              960: {
                slidesPerView: 3,
                spaceBetween: 12,
              },
              1080: {
                slidesPerView: 4,
                spaceBetween: 12,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 12,
              },
            }}
          >
            {howKaboomWorks.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <Box
                    sx={{
                      backgroundColor: youhaGrey[700],
                      borderRadius: 1,
                      p: theme.spacing(2),
                      width: "100%",
                    }}
                  >
                    <Icon name={item.icon} prefix="far" size={24} />
                    <Typography
                      sx={{
                        fontSize: 14,
                        lineHeight: `20px`,
                        fontWeight: "700",
                        m: theme.spacing(2, 0, 0, 0),
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typo
                      lines={4}
                      sx={{
                        fontSize: 14,
                        lineHeight: `20px`,
                        color: youhaGrey[200],
                      }}
                    >
                      {item.description}
                    </Typo>
                  </Box>
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
          p: theme.spacing(6, 2, 3, 2),
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
            Agencies
          </Typography>
        </Box>
        <Box
          sx={{
            "& a": {
              width: "100%",
            },
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
            {agencies.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <AgencyItem item={item} />
                </SwiperSlide>
              );
            })}
            <SwiperSlide>
              <Link href='/explore/agencies' passHref>
                <ButtonBase
                  sx={{
                    width: "100%",
                    aspectRatio: "1",
                    borderRadius: 1,
                    border: `1px solid #ffffff`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      lineHeight: `20px`,
                      textDecoration: "underline",
                    }}
                  >
                    View all
                  </Typography>
                </ButtonBase>
              </Link>
            </SwiperSlide>
          </Swiper>
        </Box>
      </Stack>
      <Stack
        spacing={2}
        className="Section"
        sx={{
          p: theme.spacing(6, 2, 3, 2),
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
            This is KAABOOM
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            "& > div:not(:nth-of-type(1))": {
              ml: 1.5,
            },
            "@media(max-width: 960px)": {
              flexDirection: "column",
              "& > div:not(:nth-of-type(1))": {
                ml: 0,
                mt: 1.5,
              },
            },
          }}
        >
          {[
            {
              title: "Gifts as unique as the people you’re gifting to",
              description:
                "Every video is personalized for the person receiving it, creating one-of-a-kind connections between celebrities and the people they inspire.",
            },
            {
              title: "Perfect for every occasion (or just because)",
              description:
                "From birthdays to holidays and friendly roasts, Cameo is here to help you bring magic into everyday moments both big and small.",
            },
            {
              title: "Someone for every fan",
              description:
                "Everyone is welcome here. With over forty-thousand celebrities, there’s a star for every kind of fan on Cameo.",
            },
          ].map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  flex: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                    lineHeight: `20px`,
                    fontWeight: "700",
                    m: theme.spacing(2, 0, 0, 0),
                  }}
                >
                  {item.title}
                </Typography>
                <Typo
                  lines={4}
                  sx={{
                    fontSize: 14,
                    lineHeight: `20px`,
                    color: youhaGrey[200],
                  }}
                >
                  {item.description}
                </Typo>
              </Box>
            );
          })}
        </Box>
      </Stack>
    </Page>
  );
}
