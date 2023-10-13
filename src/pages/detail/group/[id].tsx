import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { theme } from "../../../themes/theme";
import { agencies } from "../../../data/agency";
import AgencyItem from "../../../components/molecules/AgencyItem";
import _ from "lodash";
import ExploreHeader from "../../../components/organisms/ExploreHeader";
import { useRouter } from "next/router";
import youhaGrey from "../../../constants/youhaGrey";
import Visual from "../../../components/atoms/Visual";
import { groups } from "../../../data/group";
import GroupItem from "../../../components/molecules/GroupItem";
import { artists } from "../../../data/artist";
import ArtistItem from "../../../components/molecules/ArtistItem";
import youhaBlue from "../../../constants/youhaBlue";
import Icon from "../../../components/atoms/Icon";
import DataSection from "../../../components/organisms/DataSection";
import Link from "next/link";
import moment from "moment";
import MessageItem from "../../../components/molecules/MessageItem";
import { messages } from "../../../data/message";
import { useState } from "react";
import Page from "../../../components/atoms/Page";

export default function Index() {
  return (
    <Page needId aside>
      <Inner />
    </Page>
  );
}

function Inner() {
  const router = useRouter();
  const { id } = router.query;
  const item =
    groups[
      _.findIndex(groups, (e) => {
        return e.id === id;
      })
    ];
  const groupArtists = _.filter(artists, (e) => {
    return e.group?.name === item.name;
  });
  const agency =
    agencies[
      _.findIndex(agencies, (el) => {
        return el.name === item.agency.name;
      })
    ];
  const leader =
    artists[
      _.findIndex(artists, (el) => {
        return el.name === item.leader.name;
      })
    ];
  const fanMessages = _.filter(messages, (e) => {
    return _.flatMap(groupArtists, (el) => el.name).includes(e.artist.name);
  });
  const data = [
    {
      label: "Debut date",
      value: <>{moment(item.debutDate).format("YYYY.MM.DD")}</>,
    },
    {
      label: "Debut album",
      value: item.debutAlbum,
    },
    {
      label: "Leader",
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
          <Link href={`/detail/artist/${leader.id}`} passHref>
            <a
              href={`/detail/artist/${leader.id}`}
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              <Visual
                src={leader.thumbnail}
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
      value: (
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
          <Link href={`/detail/agency/${agency.id}`} passHref>
            <a
              href={`/detail/agency/${agency.id}`}
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              <Visual
                src={agency.thumbnail}
                absolute
                sx={{ "& *": { cursor: "pointer !important" } }}
              />
            </a>
          </Link>
        </Box>
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
        </Box>
      ),
    },
    {
      label: "Genre",
      value: (
        <>
          {item.genres.map((item, index) => {
            return (
              <span key={index}>
                {index !== 0 && ", "}
                {item}
              </span>
            );
          })}
        </>
      ),
    },
    {
      label: "Links",
      value: (
        <>
          {item.links.map((item, index) => {
            return (
              <Link href={item.link} key={index} passHref>
                <a target="_blank">
                  <Box component={"span"} sx={{ cursor: "pointer" }}>
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
                  </Box>
                </a>
              </Link>
            );
          })}
        </>
      ),
    },
  ];
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  return (
    <>
      <Box>
        <Box
          sx={{
            position: "sticky",
            top: 56,
            width: "100%",
          }}
        >
          <Box
            sx={{
              p: theme.spacing(6, 2, 3, 2),
              "@media(min-width: 960px)": {
                p: theme.spacing(6, 2, 3, 2),
              },
            }}
            className="Section"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  "@media(min-width: 960px)": {
                    flexDirection: "column",
                  },
                }}
              >
                <Box
                  sx={{
                    "@media(min-width: 960px)": {
                      position: "relative",
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: 128,
                      height: 128,
                      "@media(min-width: 960px)": {
                        width: 196,
                        height: 196,
                      },
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
                    <Link href={`/detail/agency/${agency.id}`} passHref>
                      <ButtonBase
                        sx={{
                          position: "absolute",
                          bottom: 4,
                          left: 4,
                          zIndex: 99,
                          overflow: "hidden",
                          borderRadius: 1,
                          width: 40,
                          height: 40,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          border: `1px solid ${youhaGrey[700]}`,
                        }}
                      >
                        <Visual src={agency.thumbnail} absolute noScale />
                      </ButtonBase>
                    </Link>
                  </Box>
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    p: theme.spacing(0, 0, 0, 2),
                    "@media(min-width: 960px)": {
                      flex: "initial",
                      p: theme.spacing(1, 0, 0, 0),
                    },
                  }}
                >
                  <Box
                    sx={{
                      "@media(min-width: 960px)": {
                        textAlign: "center",
                      },
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
                      {agency.name}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      m: theme.spacing(0.75, 0, 0, 0),
                      display: "flex",
                      flexWrap: "wrap",
                      "& > *": {
                        p: theme.spacing(0.25, 0),
                        "&:not(:nth-of-type(3))": {
                          mr: 2,
                        },
                      },
                      "@media(min-width: 960px)": {
                        justifyContent: "center",
                      },
                    }}
                  >
                    <Stack
                      direction={"row"}
                      spacing={0.5}
                      alignItems={"center"}
                    >
                      <Icon
                        name="user"
                        color={youhaBlue[500]}
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
                        {groupArtists.length} artists
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              </Box>
              <DataSection
                data={data}
                sx={{
                  m: theme.spacing(4, 0, 0, 0),
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box
          sx={{
            p: theme.spacing(6, 2, 3, 2),
          }}
          className="Section"
        >
          <ExploreHeader
            title="Affiliated artists"
            data={groupArtists}
            size="sm"
          />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridAutoRows: "1fr",
              gridTemplateRows: "auto",
              gridColumnGap: 12,
              gridRowGap: 32,
              "@media(min-width: 480px)": {
                gridTemplateColumns: "1fr 1fr",
              },
              "@media(min-width: 600px)": {
                gridTemplateColumns: "1fr 1fr 1fr",
              },
              "@media(min-width: 720px)": {
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
              },
              "@media(min-width: 840px)": {
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
              },
              "@media(min-width: 960px)": {
                gridTemplateColumns: "1fr 1fr 1fr",
              },
              "@media(min-width: 1080px)": {
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
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
        {fanMessages.length > 0 && (
          <Box
            sx={{
              p: theme.spacing(6, 2, 3, 2),
            }}
            className="Section"
          >
            <ExploreHeader title="Fan messages" data={messages} size="sm" />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridAutoRows: "1fr",
                gridTemplateRows: "auto",
                gridColumnGap: 12,
                gridRowGap: 32,
                "@media(min-width: 480px)": {
                  gridTemplateColumns: "1fr 1fr",
                },
                "@media(min-width: 600px)": {
                  gridTemplateColumns: "1fr 1fr 1fr",
                },
                "@media(min-width: 720px)": {
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                },
                "@media(min-width: 840px)": {
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                },
                "@media(min-width: 960px)": {
                  gridTemplateColumns: "1fr 1fr 1fr",
                },
                "@media(min-width: 1080px)": {
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                },
                "@media(min-width: 1200px)": {
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                },
              }}
              className="SectionContents"
            >
              {fanMessages.map((item, index) => {
                return (
                  <MessageItem
                    key={index}
                    item={item}
                    index={index}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                  />
                );
              })}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}
