import { useRouter } from "next/router";
import { Box, Stack, alpha } from "@mui/material";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";
import _ from "lodash";
import { ArtistProps } from "../../data/artist";
import Typo from "../../components/atoms/Typo";
import Visual from "../../components/atoms/Visual";
import IconButton from "../../components/atoms/IconButton";

export default function OrderHeader({
  artist,
  paymentMode,
}: {
  artist: ArtistProps;
  paymentMode?: boolean;
}) {
  const router = useRouter();
  const { id, videoType } = router.query;
  const onClickBack = () => {
    if (paymentMode) {
      router.replace(`${router.pathname}?id=${id}&videoType=${videoType}`);
    } else {
      router.back();
    }
  };
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          borderBottom: `1px solid ${youhaGrey[700]}`,
          backgroundColor: alpha(youhaGrey[900], 0.8),
          backdropFilter: `blur(8px)`,
          zIndex: 999,
          "@media(min-width: 961px)": {
            display: "flex",
          },
        }}
        className="Header"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: 56,
            width: "100%",
            maxWidth: "1280px",
            m: theme.spacing(0, "auto"),
            p: theme.spacing(0, 2, 0, 1),
          }}
        >
          <IconButton name="chevron-left" onClick={onClickBack} size={20} />
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            sx={{
              p: theme.spacing(0, 2),
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: 40,
                height: 40,
                "@media(min-width: 961px)": {
                  display: "none",
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
                }}
              >
                <Visual src={artist.thumbnail} absolute noScale={false} />
              </Box>
            </Box>
            <Typo
              lines={1}
              sx={{
                fontSize: 16,
                lineHeight: "24px",
                fontWeight: "700",
              }}
            >
              {artist.name && `New request for ${artist.name}`}
            </Typo>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
