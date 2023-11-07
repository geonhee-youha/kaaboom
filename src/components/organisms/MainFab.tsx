import { Fab } from "@mui/material";
import Icon from "../atoms/Icon";

export default function MainFab() {
  return (
    <Fab
      color="primary"
      aria-label="add"
      sx={{
        position: "fixed",
        right: 16,
        bottom: `calc(var(--saib) + 56px + 24px)`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "@media(min-width: 1200px)": {
          right: `calc((100vw - 1200px) / 2 + 16px)`,
        },
      }}
    >
      <Icon name="pen" prefix="fas" />
    </Fab>
  );
}
