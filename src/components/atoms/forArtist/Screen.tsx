import { Box } from "@mui/material";
import { theme } from "../../../themes/theme";
import { Global } from "@emotion/react";
import { forArtistCss } from "../../../styles/forArtist";

export default function Screen({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <Global styles={forArtistCss} />
      <Box
        sx={{
          width: "100%",
          maxWidth: "480px",
          minWidth: "320px",
          m: theme.spacing(0, "auto"),
          p: theme.spacing(
            `calc(var(-sait) + 56px)`,
            0,
            `calc(var(-saib) + 56px)`,
            0
          ),
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>
    </>
  );
}
