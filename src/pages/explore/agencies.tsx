import { Box } from "@mui/material";
import { theme } from "../../themes/theme";
import { agencies } from "../../data/agency";
import AgencyItem from "../../components/molecules/AgencyItem";
import _ from "lodash";
import ExploreHeader from "../../components/organisms/ExploreHeader";

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
        <ExploreHeader title="All agencies" data={agencies} />
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
          {agencies.map((item, index) => {
            return <AgencyItem key={index} item={item} />;
          })}
        </Box>
      </Box>
    </Box>
  );
}
