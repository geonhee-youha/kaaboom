import { Box, ButtonBase, Stack, Typography, alpha } from "@mui/material";
import { theme } from "../../themes/theme";
import { agencies } from "../../data/agency";
import AgencyItem from "../../components/molecules/AgencyItem";
import _ from "lodash";
import ExploreHeader from "../../components/organisms/ExploreHeader";
import { useRouter } from "next/router";
import youhaGrey from "../../constants/youhaGrey";
import Visual from "../../components/atoms/Visual";
import { groups } from "../../data/group";
import GroupItem from "../../components/molecules/GroupItem";
import { artists } from "../../data/artist";
import ArtistItem from "../../components/molecules/ArtistItem";
import youhaBlue from "../../constants/youhaBlue";
import Icon from "../../components/atoms/Icon";
import DataSection from "../../components/organisms/DataSection";
import Link from "next/link";
import moment from "moment";
import { messages } from "../../data/message";
import MessageItem from "../../components/molecules/MessageItem";
import { MouseEvent, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import IconButton from "../../components/atoms/IconButton";
import { pink, yellow } from "@mui/material/colors";
import Button from "../../components/atoms/Button";
import { faqs, howKaboomWorks, purchaseTypes } from "../../data";
import FaqItem from "../../components/molecules/FaqItem";

export default function Index() {
  const router = useRouter();
  const { id } = router.query;
  return id && <Page id={id} />;
}
function Page({ id }: { id: string | string[] }) {
  const router = useRouter();
  const item =
    artists[
      _.findIndex(artists, (e) => {
        return e.id === id;
      })
    ];
  const artist = item;
  const bodies = [
    item.body.height ?? "",
    item.body.weight ?? "",
    item.body.bloodType ?? "",
  ];
  const group =
    groups[
      _.findIndex(groups, (el) => {
        return el.name === item.group?.name;
      })
    ];
  const groupArtists = _.filter(artists, (el) => {
    return el.group?.name === group.name;
  });
  const artistAgencies = _.filter(agencies, (e) => {
    return _.flatMap(item.agencies, (el) => el.name).includes(e.name);
  });
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [favorite, setFavorite] = useState<boolean>(false);
  const onClickFavorite = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setFavorite(!favorite);
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
  const artistMessages = _.filter(
    messages,
    (el) => el.artist.name === item.name
  );
  const [purchaseType, setPurchaseType] = useState<string>("");
  const onClickPurchase = () => {};
  const data = [
    {
      label: "Real name",
      value: item.realName,
    },
    {
      label: "Birth date",
      value: <>{moment(item.birthday).format("YYYY.MM.DD")}</>,
    },
    {
      label: "Place of Birth",
      value: <>{item.placeOfBirth}</>,
    },
    {
      label: "Nationalities",
      value: (
        <>
          {item.nationalities.map((item, index) => {
            return <img key={index} src={item.thumbnail} className="svg" />;
          })}
        </>
      ),
    },
    {
      label: "Body",
      value: (
        <>
          {[
            item.body.height ?? "",
            item.body.weight ?? "",
            item.body.bloodType ?? "",
          ].map((item, index) => {
            console.log(item);
            return (
              <span key={index} style={{ marginRight: 4 }}>
                {item}
                {item ? (index === 0 ? "cm" : index === 1 ? "kg" : "type") : ""}
                {index !==
                  _.filter(bodies, (el) => {
                    return el !== "";
                  }).length -
                    1 ||
                _.filter(bodies, (el) => {
                  return el !== "";
                }).length === 1
                  ? ""
                  : ", "}
              </span>
            );
          })}
        </>
      ),
    },
    {
      label: "Families",
      value: (
        <>
          {item.families.map((item, index) => {
            return (
              <span key={index} style={{ marginRight: 4 }}>
                {item}
                {index !== artist.families.length - 1 && ", "}
              </span>
            );
          })}
        </>
      ),
    },
    {
      label: "Educations",
      value: artist.educations && (
        <Stack spacing={1}>
          {artist.educations.map((item, index) => {
            return (
              <Box key={index}>
                <Box>{item.name} </Box>
                <Typography
                  sx={{
                    fontSize: 12,
                    lineHeight: "16px",
                    color: youhaGrey[200],
                  }}
                >
                  ({item.state})
                </Typography>
              </Box>
            );
          })}
        </Stack>
      ),
    },
    {
      label: "Group",
      value: (
        <Box
          sx={{
            display: "inline-flex",
            position: "relative",
            borderRadius: "50%",
            overflow: "hidden",
            border: `1px solid ${youhaGrey[700]}`,
            width: `40px !important`,
            height: `40px !important`,
            mr: 1,
          }}
        >
          <Link href={`/group/${group.id}`} passHref>
            <a
              href={`/group/${group.id}`}
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              <Visual
                src={group.thumbnail}
                absolute
                sx={{ "& *": { cursor: "pointer !important" } }}
              />
            </a>
          </Link>
        </Box>
      ),
    },
    {
      label: "Agency",
      value: artistAgencies && (
        <>
          {artistAgencies.map((item, index) => {
            return (
              <Box
                sx={{
                  display: "inline-flex",
                  position: "relative",
                  borderRadius: 1,
                  overflow: "hidden",
                  border: `1px solid ${youhaGrey[700]}`,
                  width: `40px !important`,
                  height: `40px !important`,
                  mr: 1,
                }}
              >
                <Link href={`/agency/${item.id}`} passHref>
                  <a
                    href={`/agency/${item.id}`}
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    <Visual
                      src={item.thumbnail}
                      absolute
                      sx={{ "& *": { cursor: "pointer !important" } }}
                    />
                  </a>
                </Link>
              </Box>
            );
          })}
        </>
      ),
    },
    {
      label: "Fandom",
      value: item.fandom && (
        <Box
          sx={{
            "& img": {
              width: `auto !important`,
              height: `24px !important`,
            },
            mr: 1,
          }}
        >
          {item.fandom.link ? (
            <Link href={item.fandom.link ?? ""} passHref>
              <a
                target={"_blank"}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                {item.fandom.thumbnail ? (
                  <Visual
                    src={item.fandom.thumbnail}
                    sx={{ "& *": { cursor: "pointer !important" } }}
                  />
                ) : (
                  <>{item.fandom.name}</>
                )}
              </a>
            </Link>
          ) : item.fandom.thumbnail ? (
            <Visual src={item.fandom.thumbnail} />
          ) : (
            <>{item.fandom.name}</>
          )}
        </Box>
      ),
    },
    {
      label: "Positions",
      value: (
        <>
          {item.positions.map((item, index) => {
            return (
              <span key={index} style={{ marginRight: 4 }}>
                {item}
                {index !== artist.positions.length - 1 && ", "}
              </span>
            );
          })}
        </>
      ),
    },
    {
      label: "Debut",
      value: (
        <Stack spacing={1}>
          {item.debuts.group && (
            <Box>
              <Box>
                {moment(item.debuts.group.date).format("YYYY.MM.DD")}{" "}
                {item.debuts.group.group.name}{" "}
              </Box>
              <Typography
                sx={{
                  fontSize: 12,
                  lineHeight: "16px",
                  color: youhaGrey[200],
                }}
              >
                {item.debuts.group.album}
              </Typography>
            </Box>
          )}
          {item.debuts.solo && (
            <Box>
              <Box>{moment(item.debuts.solo.date).format("YYYY.MM.DD")}</Box>
              <Typography
                sx={{
                  fontSize: 12,
                  lineHeight: "16px",
                  color: youhaGrey[200],
                }}
              >
                {item.debuts.solo.album}
              </Typography>
            </Box>
          )}
        </Stack>
      ),
    },
    {
      label: "MBTI",
      value: item.mbti,
    },
    {
      label: "Links",
      value: item.links && (
        <>
          {item.links.map((item, index) => {
            return (
              <Link href={item.link} key={index}>
                <a target="_blank">
                  <img src={`/logos/${item.type}.svg`} className="svg" />
                  {item.label && (
                    <span
                      style={{
                        marginLeft: -4,
                        marginRight: 8,
                        fontSize: 12,
                        lineHeight: "16px",
                        textDecoration: "underline",
                      }}
                    >{`(${item.label})`}</span>
                  )}
                </a>
              </Link>
            );
          })}
        </>
      ),
    },
  ];
  return (
    <Box
      component={"main"}
      sx={{
        display: "flex",
        width: `100%`,
        minWidth: "280px",
        maxWidth: `1280px`,
        m: theme.spacing(0, "auto"),
        minHeight: "100vh",
        flexDirection: "column-reverse",
        "@media(min-width: 840px)": {
          flexDirection: "row-reverse",
        },
      }}
    >
      <Box
        sx={{
          flex: 1,
          "@media(min-width: 840px)": {
            width: `calc(100vw - 420px)`,
          },
          maxWidth: `calc(1280px - 420px)`,
        }}
      >
        <Box sx={{ width: "100%", p: theme.spacing(6, 2) }}>
          <Typography
            sx={{
              fontSize: 20,
              lineHeight: "32px",
              fontWeight: "700",
              // m: theme.spacing(4, 0, 0, 0),
              width: "100%",
            }}
          >
            Select video type
          </Typography>
          <Box
            sx={{
              m: theme.spacing(2, 0, 0, 0),
              width: "100%",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  "& > *:not(:nth-child(1))": {
                    ml: 1.5,
                  },
                }}
              >
                <Stack
                  direction={"row"}
                  spacing={1.5}
                  sx={{
                    width: "100%",
                    flex: 1,
                    // m: theme.spacing(2, 0, 0, 0)
                  }}
                >
                  {purchaseTypes.map((item, index) => {
                    const focused = purchaseType === item.value;
                    const onClick = () => {
                      setPurchaseType(focused ? "" : item.value);
                    };
                    return (
                      <ButtonBase
                        onClick={onClick}
                        sx={{
                          flex: 1,
                          minHeight: 136,
                          border: `1px solid ${
                            focused ? youhaBlue[400] : youhaGrey[200]
                          }`,
                          backgroundColor: focused
                            ? alpha(youhaBlue[400], 0.4)
                            : youhaGrey[700],
                          borderRadius: 1,
                          p: theme.spacing(2),
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <Stack
                          direction={"column"}
                          spacing={0.5}
                          // justifyContent={"space-between"}
                          sx={{ width: "100%" }}
                        >
                          <Icon
                            // color={focused ? youhaBlue[100] : youhaGrey[100]}
                            color={youhaGrey[100]}
                            prefix="fas"
                            name={
                              item.value === "mini" ? "film" : "camera-movie"
                            }
                          />
                          <Typography
                            sx={{
                              fontSize: 20,
                              lineHeight: "32px",
                              fontWeight: "700",
                              // color: focused ? youhaBlue[100] : youhaGrey[100],
                              color: youhaGrey[100]
                            }}
                          >
                            {item.label}
                          </Typography>
                        </Stack>
                        <Stack spacing={1}>
                          <Box>
                            <Typography
                              sx={{
                                fontSize: 12,
                                lineHeight: "16px",
                                // color: focused
                                //   ? youhaBlue[100]
                                //   : youhaGrey[100],
                                  color: youhaGrey[100]
                              }}
                            >
                              Max video length
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 14,
                                lineHeight: "20px",
                                // color: focused
                                //   ? youhaBlue[100]
                                //   : youhaGrey[100],
                                color: youhaGrey[100],
                                fontWeight: "700",
                              }}
                            >
                              {item.maxVideoLength}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              sx={{
                                fontSize: 12,
                                lineHeight: "16px",
                                // color: focused
                                //   ? youhaBlue[100]
                                //   : youhaGrey[100],
                                color: youhaGrey[100]
                              }}
                            >
                              Max letters
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 14,
                                lineHeight: "20px",
                                // color: focused
                                //   ? youhaBlue[100]
                                //   : youhaGrey[100],
                                color: youhaGrey[100],
                                fontWeight: "700",
                              }}
                            >
                              {item.maxLetters}
                            </Typography>
                          </Box>
                        </Stack>
                      </ButtonBase>
                    );
                  })}
                </Stack>
                <Box
                  sx={{
                    flex: 1,
                    display: "none",
                    border: `1px solid ${youhaGrey[700]}`,
                    background: youhaGrey[800],
                    borderRadius: 1,
                    p: theme.spacing(2),
                    "@media(min-width: 1080px)": {
                      display: "block",
                    },
                  }}
                >
                  <Stack direction={"row"} spacing={1} sx={{ mb: 1 }}>
                    <Icon name="rotate-left" size={20} prefix="fas" />
                    <Typography
                      sx={{
                        fontSize: 14,
                        lineHeight: "20px",
                        fontWeight: "700",
                      }}
                    >
                      Money back guarantee
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{
                      fontSize: 14,
                      lineHeight: "20px",
                      color: youhaGrey[200],
                    }}
                  >
                    If you pay on web by card, we reserve the amount when you
                    place your order but only charge once you have received the
                    video.
                    <br />
                    <br />
                    If you book a video on web with another payment method, we
                    will always provide a full refund if the celebrity doesn’t
                    respond.
                  </Typography>
                </Box>
              </Box>
              <Stack
                spacing={1}
                sx={{ m: theme.spacing(2, 0, 0, 0), flex: 1, width: "100%" }}
              >
                <Button size="lg" fullWidth backgroundColor={youhaBlue[500]}>
                  Get a personal video reply $
                  {purchaseType === "long" ? `1,250,00` : `250.00`}
                </Button>
              </Stack>
              <Box
                sx={{
                  mt: 2,
                  display: "block",
                  border: `1px solid ${youhaGrey[700]}`,
                  background: youhaGrey[800],
                  borderRadius: 1,
                  p: theme.spacing(2),
                  "@media(min-width: 1080px)": {
                    display: "none",
                  },
                }}
              >
                <Stack direction={"row"} spacing={1} sx={{ mb: 1 }}>
                  <Icon name="rotate-left" size={20} prefix="fas" />
                  <Typography
                    sx={{
                      fontSize: 14,
                      lineHeight: "20px",
                      fontWeight: "700",
                    }}
                  >
                    Money back guarantee
                  </Typography>
                </Stack>
                <Typography
                  sx={{
                    fontSize: 14,
                    lineHeight: "20px",
                    color: youhaGrey[200],
                  }}
                >
                  If you pay on web by card, we reserve the amount when you
                  place your order but only charge once you have received the
                  video.
                  <br />
                  <br />
                  If you book a video on web with another payment method, we
                  will always provide a full refund if the celebrity doesn’t
                  respond.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Stack
          spacing={2}
          className="Section"
          sx={{
            p: theme.spacing(6, 2),
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
                  slidesPerView: 3,
                  spaceBetween: 12,
                },
                960: {
                  slidesPerView: 3,
                  spaceBetween: 12,
                },
                1080: {
                  slidesPerView: 3,
                  spaceBetween: 12,
                },
                1200: {
                  slidesPerView: 4,
                  spaceBetween: 12,
                },
              }}
            >
              <SwiperSlide>
                <Box>
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      aspectRatio: `9 / 16`,
                      borderRadius: 1,
                      overflow: "hidden",
                      "& > div:first-child": {
                        width: "100% !important",
                        height: "100% !important",
                      },
                      "& video": {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        objectFit: "cover",
                      },
                      "&:hover .time": {
                        opacity: 0,
                      },
                      background: `linear-gradient(135deg, ${alpha(
                        youhaBlue[400],
                        1
                      )}, ${alpha(youhaBlue[800], 1)})`,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      p: theme.spacing(2),
                      textAlign: "center",
                    }}
                    onClick={onClickPurchase}
                  >
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 14,
                          lineHeight: `20px`,
                          fontWeight: "700",
                          mb: 1,
                        }}
                      >
                        For every occasion
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 14,
                          lineHeight: `20px`,
                          mb: 1,
                        }}
                      >
                        Birthdays, graduations and even the holiday season,
                        celebrate it with a personalized video.
                      </Typography>
                    </Box>
                    <Button
                      type="outlined"
                      size="md"
                      borderColor="#ffffff"
                      color="#ffffff"
                      fullWidth
                      sx={{
                        mt: "auto",
                      }}
                    >
                      Get now
                    </Button>
                  </Box>
                  <Stack direction={"row"} spacing={1} sx={{ mt: 2 }}>
                    <Icon
                      name="bolt"
                      prefix="fas"
                      size={24}
                      color={yellow[400]}
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontSize: 16,
                          lineHeight: `24px`,
                          fontWeight: "700",
                        }}
                      >
                        24hr delivery
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 14,
                          lineHeight: `20px`,
                        }}
                      >
                        For every occasion
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </SwiperSlide>
              {artistMessages.map((item, index) => {
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
        <Box
          sx={{
            p: theme.spacing(6, 2),
            position: "relative",
            "&:before": {
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              content: '""',
              height: `1px`,
              backgroundColor: youhaGrey[500],
            },
            "&:after": {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              content: '""',
              height: `1px`,
              backgroundColor: youhaGrey[500],
            },
            "@media(min-width: 840px)": {
              "&:before": {
                position: "absolute",
                bottom: 0,
                left: 16,
                right: 16,
                content: '""',
                height: `1px`,
                backgroundColor: youhaGrey[500],
              },
              "&:after": {
                position: "absolute",
                top: 0,
                left: 16,
                right: 16,
                content: '""',
                height: `1px`,
                backgroundColor: youhaGrey[500],
              },
            },
          }}
          className="Section"
        >
          <Box
            sx={{
              m: theme.spacing(0, 0, 2, 0),
            }}
            className="SectionTitle"
          >
            <Typography
              sx={{
                fontSize: 20,
                lineHeight: "32px",
                fontWeight: "700",
                "@media(min-width: 600px)": {
                  "& br": {
                    display: "none",
                  },
                },
              }}
            >
              How KABOOM works
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                color: youhaGrey[200],
              }}
            >
              Request a personalized video message for any occasion.
            </Typography>
            <Box
              sx={{
                m: theme.spacing(4, 0, 0, 0),
                display: "flex",
                position: "relative",
                flexDirection: "column",
                "& > div:not(:nth-child(1))": {
                  m: theme.spacing(2, 0, 0, 0),
                },
                "&:after": {
                  position: "absolute",
                  top: 0,
                  left: 20,
                  bottom: `calc(25% - 20px)`,
                  content: '""',
                  width: "1px",
                  border: `1px dashed ${youhaGrey[500]}`,
                },
                "@media(min-width: 840px)": {
                  flexDirection: "row",
                  "& > div:not(:nth-child(1))": {
                    m: theme.spacing(0, 0, 0, 4),
                  },
                  "&:after": {
                    position: "absolute",
                    top: 20,
                    left: 0,
                    right: `calc(25% - 40px)`,
                    content: '""',
                    width: "initial",
                    height: "1px",
                    border: `1px dashed ${youhaGrey[500]}`,
                  },
                },
              }}
            >
              {howKaboomWorks.map((item, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flex: 1,
                      zIndex: 9,
                      "@media(min-width: 840px)": {
                        flexDirection: "column",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: 40,
                        height: 40,
                        border: `1px solid ${youhaGrey[500]}`,
                        backgroundColor: youhaGrey[900],
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 24,
                          lineHeight: "36px",
                          fontWeight: "700",
                        }}
                      >
                        {index + 1}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        flex: 1,
                        m: theme.spacing(0, 0, 0, 2),
                        "@media(min-width: 840px)": {
                          m: theme.spacing(1, 0, 0, 0),
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 16,
                          lineHeight: "24px",
                          fontWeight: "700",
                          m: theme.spacing(0, 0, 0.5, 0),
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 14,
                          lineHeight: "20px",
                          color: youhaGrey[200],
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
            <Box
              sx={{
                display: "none",
                m: theme.spacing(6, 0, 0, 0),
                border: `1px solid ${youhaGrey[700]}`,
                background: youhaGrey[800],
                borderRadius: 1,
                p: theme.spacing(2),
              }}
            >
              <Stack direction={"row"} spacing={1} sx={{ mb: 1 }}>
                <Icon name="rotate-left" size={20} prefix="fas" />
                <Typography
                  sx={{
                    fontSize: 14,
                    lineHeight: "20px",
                    fontWeight: "700",
                  }}
                >
                  Money back guarantee
                </Typography>
              </Stack>
              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: "20px",
                  color: youhaGrey[200],
                }}
              >
                If you pay on web by card, we reserve the amount when you place
                your order but only charge once you have received the video.
                <br />
                <br />
                If you book a video on web with another payment method, we will
                always provide a full refund if the celebrity doesn’t respond.
              </Typography>
            </Box>
          </Box>
        </Box>
        {groupArtists.length > 0 && (
          <Box
            sx={{
              p: theme.spacing(6, 2),
            }}
            className="Section"
          >
            <ExploreHeader
              title="Related artists"
              data={groupArtists}
              size="sm"
            />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridAutoRows: "1fr",
                gridTemplateRows: "auto auto",
                gridColumnGap: 12,
                gridRowGap: 32,
                "@media(min-width: 480px)": {
                  gridTemplateColumns: "1fr 1fr 1fr",
                },
                "@media(min-width: 600px)": {
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                },
                "@media(min-width: 720px)": {
                  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                },
                "@media(min-width: 840px)": {
                  gridTemplateColumns: "1fr 1fr 1fr",
                },
                "@media(min-width: 1080px)": {
                  gridTemplateColumns: "1fr 1fr 1fr",
                },
                "@media(min-width: 1200px)": {
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                },
              }}
              className="SectionContents"
            >
              {groupArtists.map((item, index) => {
                return <ArtistItem key={index} item={item} />;
              })}
            </Box>
          </Box>
        )}
        <Box
          sx={{
            p: theme.spacing(6, 2),
          }}
          className="Section"
        >
          <Box
            sx={{
              m: theme.spacing(0, 0, 2, 0),
            }}
            className="SectionTitle"
          >
            <Typography
              sx={{
                fontSize: 20,
                lineHeight: "32px",
                fontWeight: "700",
                "@media(min-width: 600px)": {
                  "& br": {
                    display: "none",
                  },
                },
              }}
            >
              Frequently asked questions
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              position: "relative",
              flexDirection: "column",
              border: `1px solid ${youhaGrey[700]}`,
              background: youhaGrey[800],
              borderRadius: 1,
            }}
          >
            {faqs.map((item, index) => {
              return <FaqItem key={index} item={item} />;
            })}
          </Box>
        </Box>
      </Box>
      <Box
        component={"aside"}
        sx={{
          width: "100%",
          "@media(min-width: 840px)": {
            width: 420,
            display: "block",
            p: theme.spacing(0, 2, 0, 0),
          },
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 56,
            width: "100%",
          }}
        >
          <Box
            sx={{
              p: theme.spacing(6, 2),
            }}
            className="Section"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: 160,
                  height: 160,
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    border: `1px solid ${youhaGrey[700]}`,
                    borderRadius: "50%",
                    overflow: "hidden",
                    aspectRatio: `1`,
                    p: theme.spacing(2),
                  }}
                >
                  <Visual src={item.thumbnail} absolute noScale={false} />
                </Box>
                <IconButton
                  name={"heart"}
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    zIndex: 99,
                    boxShadow:
                      "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)",
                  }}
                  backgroundColor={alpha(youhaGrey[800], 1)}
                  borderColor={youhaGrey[700]}
                  prefix={favorite ? "fas" : "far"}
                  onClick={onClickFavorite}
                  color={favorite ? pink[400] : "#ffffff"}
                />
              </Box>
              <Box
                sx={{
                  m: theme.spacing(1, 0, 0, 0),
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 24,
                    lineHeight: "36px",
                    fontWeight: "700",
                    color: `#ffffff !important`,
                  }}
                >
                  {item.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    lineHeight: "20px",
                    color: youhaGrey[200],
                  }}
                >
                  {item.group?.name ?? "SOLO"}
                </Typography>
              </Box>
              <Stack
                direction={"row"}
                spacing={2}
                sx={{
                  m: theme.spacing(1, 0, 0, 0),
                  display: "flex",
                }}
              >
                <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
                  <Icon
                    name="heart"
                    color={youhaBlue[400]}
                    size={20}
                    prefix="fas"
                  />
                  <Typography
                    sx={{
                      fontSize: 14,
                      lineHeight: "20px",
                      fontFamily: "Poppins",
                      color: youhaGrey[200],
                    }}
                  >
                    283
                  </Typography>
                </Stack>
                <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
                  <Icon
                    name="thumbs-up"
                    color={youhaBlue[400]}
                    size={20}
                    prefix="fas"
                  />
                  <Typography
                    sx={{
                      fontSize: 14,
                      lineHeight: "20px",
                      fontFamily: "Poppins",
                      color: youhaGrey[200],
                    }}
                  >
                    1,230
                  </Typography>
                </Stack>
                <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
                  <Icon
                    name="film"
                    color={youhaBlue[400]}
                    size={20}
                    prefix="fas"
                  />
                  <Typography
                    sx={{
                      fontSize: 14,
                      lineHeight: "20px",
                      fontFamily: "Poppins",
                      color: youhaGrey[200],
                    }}
                  >
                    00:24
                  </Typography>
                </Stack>
              </Stack>

              <DataSection data={data} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
