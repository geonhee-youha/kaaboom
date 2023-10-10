import { Box, Stack, Typography } from "@mui/material";
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
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import IconButton from "../../components/atoms/IconButton";

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
  const artistMessages = _.filter(
    messages,
    (el) => el.artist.name === item.name
  );
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
              <Box>
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
        }}
      >
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
                  slidesPerView: 4,
                  spaceBetween: 12,
                },
                1200: {
                  slidesPerView: 5,
                  spaceBetween: 12,
                },
              }}
            >
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
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                },
                "@media(min-width: 1200px)": {
                  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
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
                    color: youhaGrey[300],
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
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
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
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
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
              </Stack>
              <DataSection data={data} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
