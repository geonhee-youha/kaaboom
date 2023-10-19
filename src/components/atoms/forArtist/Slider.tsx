import _ from "lodash";
import { Box, CircularProgress, Slide } from "@mui/material";
import { theme } from "../../../themes/theme";
import youhaGrey from "../../../constants/youhaGrey";
type Props = {
  open: boolean;
  loading?: boolean;
  header?: React.ReactNode;
  children?: React.ReactNode;
  direction?: "left" | "right" | "up" | "down" | undefined;
};
export default function Slider({
  open,
  loading,
  header,
  children,
  direction,
}: Props) {
  return (
    <Slide
      appear={false}
      direction={direction ? direction : "left"}
      in={open}
      mountOnEnter
      unmountOnExit
      timeout={200}
    >
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99999,
          overflow: 'scroll'
        }}
      >
        {header}
        <Box
          sx={{
            width: `100%`,
            minWidth: "280px",
            maxWidth: `480px`,
            m: theme.spacing(0, "auto"),
            minHeight: "100vh",
            p: theme.spacing(
              `calc(var(--sait) + 56px)`,
              0,
              `calc(var(--saib) + 96px)`,
              0
            ),
            height: loading ? "100%" : "auto",
            backgroundColor: youhaGrey[900],
          }}
        >
          {loading ? (
            <Box
              sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>{children}</>
          )}
        </Box>
      </Box>
    </Slide>
  );
}
