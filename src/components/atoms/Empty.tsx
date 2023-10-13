import { Box } from "@mui/material";
import { theme } from "../../themes/theme";

export default function Empty({
  full,
  children,
}: {
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        width: "100%",
        height: full ? "100%" : `200px`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        "@media(min-width: 960px)": {
          height: full ? "100%" : `200px`,
        },
        p: theme.spacing(2),
      }}
    >
      {children}
    </Box>
  );
}
