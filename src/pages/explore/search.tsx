import { Box, Typography } from "@mui/material";
import { theme } from "../../themes/theme";
import _ from "lodash";
import ExploreHeader from "../../components/organisms/ExploreHeader";
import { artists } from "../../data/artist";
import ArtistItem from "../../components/molecules/ArtistItem";
import { useRouter } from "next/router";
import { groups } from "../../data/group";
import { agencies } from "../../data/agency";
import GroupItem from "../../components/molecules/GroupItem";
import AgencyItem from "../../components/molecules/AgencyItem";
import youhaGrey from "../../constants/youhaGrey";

export default function Index() {
  const router = useRouter();
  const { searchText } = router.query;
  //   const searchedArtists = _.filter(artists, (el) => {
  //     return el.group
  //       ? el.group.name.toLowerCase().includes(`${searchText}`.toLowerCase()) ||
  //           el.name.toLowerCase().includes(`${searchText}`.toLowerCase())
  //       : el.name.toLowerCase().includes(`${searchText}`.toLowerCase());
  //   });
  const searchedArtists = _.filter(artists, (el) => {
    return el.name.toLowerCase().includes(`${searchText}`.toLowerCase());
  });
  const searchedGroups = _.filter(groups, (el) => {
    return el.name.toLowerCase().includes(`${searchText}`.toLowerCase());
  });
  const searchedAgencies = _.filter(agencies, (el) => {
    return el.name.toLowerCase().includes(`${searchText}`.toLowerCase());
  });
  return (
    <Box
      sx={{
        width: `100%`,
        minWidth: "280px",
        maxWidth: `1280px`,
        m: theme.spacing(0, "auto"),
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          m: theme.spacing(1, 0),
          p: theme.spacing(6, 2, 0, 2)
        }}
        className="SectionTitle"
      >
        <Typography
          sx={{
            fontSize: 28,
            lineHeight: "40px",
            fontWeight: "700",
            "& span": {
              fontSize: 14,
              lineHeight: "20px",
              color: youhaGrey[300],
              fontWeight: '400',
              m: theme.spacing(0, 0, 0, 1)
            },
            "@media(min-width: 600px)": {
              "& br": {
                display: "none",
              },
            },
          }}
        >
          Results for "{searchText}"
          <span>
            {searchedArtists.length +
              searchedGroups.length +
              searchedAgencies.length}{" "}
            results
          </span>
        </Typography>
      </Box>
      <Box
        sx={{
          p: theme.spacing(6, 2),
        }}
        className="Section"
      >
        <ExploreHeader title="Artists" data={searchedArtists} size="sm" />
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
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
            },
          }}
          className="SectionContents"
        >
          {searchedArtists.map((item, index) => {
            return (
              <ArtistItem
                key={index}
                item={item}
                searchText={`${searchText}`}
              />
            );
          })}
        </Box>
      </Box>
      <Box
        sx={{
          p: theme.spacing(6, 2),
        }}
        className="Section"
      >
        <ExploreHeader title="Groups" data={searchedGroups} size="sm" />
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
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
            },
          }}
          className="SectionContents"
        >
          {searchedGroups.map((item, index) => {
            return (
              <GroupItem key={index} item={item} searchText={`${searchText}`} />
            );
          })}
        </Box>
      </Box>
      <Box
        sx={{
          p: theme.spacing(6, 2),
        }}
        className="Section"
      >
        <ExploreHeader title="Agencies" data={searchedAgencies} size="sm" />
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
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
            },
          }}
          className="SectionContents"
        >
          {searchedAgencies.map((item, index) => {
            return (
              <AgencyItem
                key={index}
                item={item}
                searchText={`${searchText}`}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
