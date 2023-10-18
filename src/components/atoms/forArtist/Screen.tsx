import { Box } from "@mui/material";
import { theme } from "../../../themes/theme";
import { Global } from "@emotion/react";
import { forArtistCss } from "../../../styles/forArtist";
import { useViewportSize } from "../../../hooks/useViewportSize";
import { isIOS } from "react-device-detect";
import youhaGrey from "../../../constants/youhaGrey";

export default function Screen({ children }: { children?: React.ReactNode }) {
  const { viewportHeight, offsetTop } = useViewportSize();
  return (
    <>
      <Global styles={forArtistCss} />
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: viewportHeight !== 0 && isIOS ? viewportHeight : "100%",
            transform:
              viewportHeight !== 0 && isIOS
                ? `translateY(${offsetTop}px)`
                : "none",
            touchAction: "none",
            backgroundColor: youhaGrey[900],
            overflow: "hidden",
          }}
          className="Viewport"
        >
          {children}
        </Box>
      </Box>
      {/* <Box
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
      </Box> */}
    </>
  );
}
