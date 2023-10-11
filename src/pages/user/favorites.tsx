import { Box } from "@mui/material";
import { theme } from "../../themes/theme";
import _ from "lodash";
import ExploreHeader from "../../components/organisms/ExploreHeader";
import { artists } from "../../data/artist";
import ArtistItem from "../../components/molecules/ArtistItem";
import Page from "../../components/atoms/Page";

export default function Index() {
  return (
    <Page>
      <Box
        sx={{
          p: theme.spacing(6, 2, 0, 2),
        }}
        className="Section"
      >
        <ExploreHeader title="My Favorites" data={artists} label='artists' />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridAutoRows: "1fr",
            gridTemplateRows: "auto",
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
    </Page>
  );
}
