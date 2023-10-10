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

export default function Index() {
  const router = useRouter();
  const { id } = router.query;
  return id && <Page id={id} />;
}
function Page({ id }: { id: string | string[] }) {
  const router = useRouter();
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
            borderRadius: `50%`,
            overflow: "hidden",
            border: `1px solid ${youhaGrey[700]}`,
            width: `40px !important`,
            height: `40px !important`,
            mr: 1,
          }}
        >
          <a
            href={`/artist/${leader.id}`}
            style={{ textDecoration: "underline", cursor: "pointer" }}
          >
            <Visual src={leader.thumbnail} absolute sx={{}} />
          </a>
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
          <a
            href={`/agency/${agency.id}`}
            style={{ textDecoration: "underline", cursor: "pointer" }}
          >
            <Visual src={agency.thumbnail} absolute sx={{}} />
          </a>
        </Box>
      ),
    },
    {
      label: "Fandom",
      value: item.fandom?.name,
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
    // {
    //   label: "Establisher",
    //   value: item.establisher,
    // },
    // {
    //   label: "CEO",
    //   value: item.ceo,
    // },
    // {
    //   label: "Address",
    //   value: item.address,
    // },
    {
      label: "Links",
      value: (
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
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            p: theme.spacing(6, 2),
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
              "@media(min-width: 1280px)": {
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
                  m: theme.spacing(1, 0, 0, 0),
                  display: "flex",
                }}
              >
                <Stack
                  direction={"row"}
                  spacing={1}
                  alignItems={"center"}
                  sx={{ ml: 2 }}
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
                    {groupArtists.length} Artists
                  </Typography>
                </Stack>
              </Box>
              <DataSection data={data} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
