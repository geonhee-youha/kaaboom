import { Box } from "@mui/material";
import { theme } from "../../../themes/theme";

export default function Screen({ children }: { children?: React.ReactNode }) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "480px",
        minWidth: "320px",
        m: theme.spacing(0, "auto"),
        p: theme.spacing(7, 0, 7, 0),
        minHeight: "100vh",
      }}
    >
      {children}
    </Box>
  );
}
