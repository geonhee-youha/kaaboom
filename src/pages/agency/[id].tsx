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

export default function Index() {
  const router = useRouter();
  const { id } = router.query;
  return id && <Page id={id} />;
}
function Page({ id }: { id: string | string[] }) {
  const router = useRouter();
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
    return e.agency?.name === item.name;
  });
  const data = [
    {
      label: "Nation",
      value: (
        <>
          <img src={item.nation.thumbnail} className="svg"/>
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
            title="Affiliated groups"
            data={agencyGroups}
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
            {agencyGroups.map((item, index) => {
              return <GroupItem key={index} item={item} />;
            })}
          </Box>
        </Box>
        <Box
          sx={{
            p: theme.spacing(6, 2),
          }}
          className="Section"
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
            {agencyArtists.map((item, index) => {
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
                  flexWrap={"wrap"}
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
                    {agencyGroups.length} Groups
                  </Typography>
                </Stack>
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
                    {agencyArtists.length} Artists
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
