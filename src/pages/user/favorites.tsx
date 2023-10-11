import { Box } from "@mui/material";
import { theme } from "../../themes/theme";
import _ from "lodash";
import ExploreHeader from "../../components/organisms/ExploreHeader";
import { artists } from "../../data/artist";
import ArtistItem from "../../components/molecules/ArtistItem";

export default function Index() {
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
          p: theme.spacing(6, 2),
        }}
        className="Section"
      >
        <ExploreHeader title="My Favorites" data={artists} label='artists'/>
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
          {artists.map((item, index) => {
            return <ArtistItem key={index} item={item} />;
          })}
        </Box>
      </Box>
    </Box>
  );
}
