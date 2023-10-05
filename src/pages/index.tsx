import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { theme } from "../themes/theme";
import Visual from "../components/atoms/Visual";
import { ArtistProps, artists } from "../data/artist";
import youhaGrey from "../constants/youhaGrey";
import ArtistItem from "../components/molecules/ArtistItem";

type Section1ArtistProps = { item: ArtistProps };

function Section1Artist({ item }: Section1ArtistProps) {
  return (
    <ButtonBase
      sx={{
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 0,
          p: theme.spacing("100%", 0, 0, 0),
          border: `1px solid ${youhaGrey[700]}`,
          borderRadius: "50%",
          overflow: "hidden",
        }}
      >
        <Visual src={item.thumbnail} absolute />
      </Box>
      <Box
        sx={{
          m: theme.spacing(1, 0, 0, 0),
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            lineHeight: "16px",
            extAlign: "center",
            color: youhaGrey[300],
            fontFamily: "Pretendard",
          }}
        >
          {item.group?.name ?? "SOLO"}
        </Typography>
        <Typography
          sx={{
            fontWeight: "700",
            textAlign: "center",
            fontFamily: "Pretendard",
          }}
        >
          {item.name}
        </Typography>
      </Box>
    </ButtonBase>
  );
}

export default function Index() {
  return (
    <Box
      sx={{
        width: `100%`,
        minWidth: "280px",
        maxWidth: `1280px`,
        m: theme.spacing(0, "auto"),
      }}
    >
      <Stack
        spacing={3}
        sx={{
          p: theme.spacing(4, 2),
        }}
        className="Section"
      >
        <Box
          sx={{
            m: theme.spacing(1, 0),
          }}
          className="SectionTitle"
        >
          <Typography
            sx={{
              fontSize: 28,
              lineHeight: "40px",
              fontWeight: "700",
              textAlign: "center",
              "@media(min-width: 600px)": {
                "& br": {
                  display: "none",
                },
              },
            }}
          >
            Personalized video
            <br />
            from your favorite artists
          </Typography>
        </Box>
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
        <Box
          sx={{
            display: "none",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridAutoRows: "1fr",
            gridTemplateRows: "auto auto",
            gridColumnGap: 12,
            gridRowGap: 32,
          }}
          className="SectionContents"
        >
          {artists.map((item, index) => {
            return <Section1Artist key={index} item={item} />;
          })}
        </Box>
      </Stack>
    </Box>
  );
}
