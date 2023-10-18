import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { theme } from "../../../themes/theme";
import youhaGrey from "../../../constants/youhaGrey";
import { navItems } from "./BottomNavigation";
import _ from "lodash";
import IconButton from "../../atoms/IconButton";
import { isIOS } from "react-device-detect";

export default function HeaderNavigation() {
  const router = useRouter();
  const pathnames = router.pathname.split("/");
  const pathname = pathnames[2];
  const forArtist = pathnames[1] === "forArtist";
  const currentNavigation =
    navItems[
      _.findIndex(
        navItems,
        (el) =>
          pathname === el.url.replace("/", "") ||
          (pathname === undefined && el.url === "/")
      )
    ];
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, [setMounted]);
  return mounted && forArtist ? (
    <Box
      sx={{
        position: isIOS ? 'absolute' : 'fixed',
        left: 0,
        right: 0,
        top: 0,
        zIndex: 999,
        p: theme.spacing("var(-sait)", 0, 0, 0),
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
        <IconButton name="bars" prefix="far" size={24} />
        <Box
          sx={{
            p: theme.spacing(0, 0.5),
          }}
        >
          <Typography
            sx={{
              fontSize: 20,
              lineHeight: "32px",
              fontWeight: "700",
            }}
          >
            {currentNavigation.label}
          </Typography>
        </Box>
      </Box>
    </Box>
  ) : (
    <></>
  );
}
