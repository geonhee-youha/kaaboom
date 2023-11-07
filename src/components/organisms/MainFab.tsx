import { Fab, Zoom } from "@mui/material";
import Icon from "../atoms/Icon";
import { bottomTabs } from "./BottomNav";
import { useRouter } from "next/router";

export default function MainFab() {
  const router = useRouter();
  const active = bottomTabs.flatMap((el) => el.value).includes(router.pathname);
  return (
    <Zoom in={active}>
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
          width: 52,
          height: 52,
          "& svg": {
            fontSize: `20px !important`,
          },
        }}
      >
        <Icon name="pen" prefix="fas" size={20} />
      </Fab>
    </Zoom>
  );
}
