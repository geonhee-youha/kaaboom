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
import Page from "../../components/atoms/Page";

export default function Index() {
  return <Page
    needId
    aside
  ><Inner /></Page>
}

function Inner() {
  const router = useRouter();
  const { id } = router.query;
  const item =
    agencies[
    _.findIndex(agencies, (e) => {
      return e.id === id;
    })
    ];
  const agencyGroups = _.filter(groups, (e) => {
    return e.agency?.name === item.name;
  });
  const agencyArtists = _.filter(artists, (e) => {
    return _.flatMap(e.agencies, (el) => el.name).includes(item.name);
  });
  const parentCompany = item.parentCompany
    ? agencies[
    _.findIndex(agencies, (e) => {
      return e.name === item.parentCompany?.name;
    })
    ] ?? { name: item.parentCompany?.name }
    : null;
  const data = [
    {
      label: "Nation",
      value: (
        <>
          <img src={item.nation.thumbnail} className="svg" />
          {item.nation.name}
        </>
      ),
    },
    {
      label: "Establishment Date",
      value: item.establishmentDate,
    },
    {
      label: "Establisher",
      value: item.establisher,
    },
    {
      label: "CEO",
      value: item.ceo,
    },
    {
      label: "Address",
      value: item.address,
    },
    {
      label: "Parent company",
      value: parentCompany && (
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
          {parentCompany.id ? (
            <Link href={`/agency/${parentCompany.id}`} passHref>
              <a
                href={`/agency/${parentCompany.id}`}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                <Visual
                  src={parentCompany.thumbnail}
                  absolute
                  sx={{ "& *": { cursor: "pointer !important" } }}
                />
              </a>
            </Link>
          ) : (
            <a
              target={"_blank"}
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              {parentCompany.name}
            </a>
          )}
        </Box>
      ),
    },
    {
      label: "Links",
      value: (
        <>
          {item.links.map((item, index) => {
            return (
              <Link href={item.link} key={index}>
                <a target="_blank">
                  <img src={`/logos/${item.type}.svg`} className="svg" />
                  {item.label && ` (${item.label})`}
                </a>
              </Link>
            );
          })}
        </>
      ),
    },
  ];
  return (
    <>
      <Box sx={{ flex: 1, p: theme.spacing(0, 0, 12, 0) }}>
        {agencyGroups.length > 0 && (
          <Box
            sx={{ p: theme.spacing(6, 2, 3, 2), }}
            className="Section"
          >
            <ExploreHeader
              title="Affiliated groups"
              data={agencyGroups}
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
              {agencyGroups.map((item, index) => {
                return <GroupItem key={index} item={item} />;
              })}
            </Box>
          </Box>
        )}
        {agencyArtists.length > 0 && (
          <Box className="Section" sx={{
            p: theme.spacing(6, 2, 3, 2),
          }}
          >
            <ExploreHeader
              title="Affiliated artists"
              data={agencyArtists}
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
                mb: -3,
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
              {agencyArtists.map((item, index) => {
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
          "@media(min-width: 960px)": {
            width: 420,
            display: "block",
            p: theme.spacing(0, 2, 12, 0),
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
                        borderRadius: 1,
                        overflow: "hidden",
                        aspectRatio: `1`,
                        p: theme.spacing(2),
                      }}
                    >
                      <Visual src={item.thumbnail} absolute noScale={false} />
                    </Box>
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
                  </Box>
                  <Box
                    sx={{
                      m: theme.spacing(0.75, 0, 0, 0),
                      display: "flex",
                      flexWrap: "wrap",
                      "& > *": {
                        p: theme.spacing(0.25, 0),
                        "&:not(:nth-child(3))": {
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
                        name="users"
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
                        {agencyGroups.length} groups
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      spacing={0.5}
                      alignItems={"center"}
                    >
                      <Icon
                        name="user"
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
                        {agencyArtists.length} artists
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
    </>
  );
}
