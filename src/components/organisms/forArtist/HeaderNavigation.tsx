import { Box, ButtonBase, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { theme } from "../../../themes/theme";
import youhaGrey from "../../../constants/youhaGrey";
import { navItems } from "./BottomNavigation";
import _ from "lodash";
import IconButton from "../../atoms/IconButton";
import { isIOS } from "react-device-detect";
import { sideNavigationState } from "../../../constants/recoils";
import { useRecoilState } from "recoil";

export default function HeaderNavigation() {
  const [sideNavigation, setSideNavigation] =
    useRecoilState(sideNavigationState);
  const router = useRouter();
  const pathnames = router.pathname.split("/");
  const pathname = pathnames[2];
  const forArtist = pathnames[1] === "forArtist" && pathnames[2] !== "detail";
  const currentNavigation =
    navItems[
      _.findIndex(
        navItems,
        (el) =>
          pathname === el.url.replace("/", "") ||
          (pathname === undefined && el.url === "/")
      )
    ];
  const onClickBars = () => {
    setSideNavigation({
      open: true,
    });
  };
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, [setMounted]);
  const onClickLabel = () => {
    window.scrollTo(0, 0);
  };
  return mounted && forArtist ? (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        zIndex: 999,
        p: theme.spacing("var(--sait)", 0, 0, 0),
        backgroundColor: youhaGrey[900],
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "480px",
          minWidth: "320px",
          m: theme.spacing(0, "auto"),
          p: theme.spacing(0, 1),
          height: 56,
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton name="bars" prefix="fas" size={20} onClick={onClickBars} />
        <ButtonBase
          sx={{
            p: theme.spacing(0, 0.5),
          }}
          onClick={onClickLabel}
        >
          <Typography
            sx={{
              fontSize: 20,
              lineHeight: "32px",
              fontWeight: "700",
            }}
          >
            {currentNavigation?.label ?? ""}
          </Typography>
        </ButtonBase>
      </Box>
    </Box>
  ) : (
    <></>
  );
}
