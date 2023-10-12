import { Box, Typography } from "@mui/material";
import { theme } from "../../themes/theme";
import _ from "lodash";
import ExploreHeader from "../../components/organisms/ExploreHeader";
import { artists } from "../../data/artist";
import ArtistItem from "../../components/molecules/ArtistItem";
import Page from "../../components/atoms/Page";
import { useRecoilState } from "recoil";
import { favoriteIdsState } from "../../constants/recoils";
import Empty from "../../components/atoms/Empty";
import Link from "next/link";
import TextButton from "../../components/atoms/TextButton";
import youhaBlue from "../../constants/youhaBlue";
import youhaGrey from "../../constants/youhaGrey";

export default function Index() {
  const [favoriteIds, setFavoriteIDs] = useRecoilState(favoriteIdsState);
  const data = _.filter(
    artists,
    (el) => _.findIndex(favoriteIds, (item) => item === el.id) !== -1
  );
  return (
    <Page>
      <Box
        sx={{
          p: theme.spacing(6, 2, 0, 2),
        }}
        className="Section"
      >
        <ExploreHeader title="My Favorites" data={data} label="artists" />
        {data.length === 0 ? (
          <Empty>
            <Typography
              sx={{
                fontSize: 16,
                lineHeight: "24px",
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              You aren't favorite anyone
            </Typography>
            <Link href="/explore/artists" passHref>
              <TextButton
                size="lg"
                label={"Browse artists"}
                color={youhaBlue[400]}
              />
            </Link>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                color: youhaGrey[200],
                textAlign: "center",
              }}
            >
              Follow talent by pressing 💖 while browsing.
            </Typography>
          </Empty>
        ) : (
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
            {data.map((item, index) => {
              return <ArtistItem key={index} item={item} />;
            })}
          </Box>
        )}
      </Box>
    </Page>
  );
}
