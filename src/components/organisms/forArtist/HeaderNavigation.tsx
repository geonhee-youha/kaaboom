import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { theme } from "../../../themes/theme";
import youhaGrey from "../../../constants/youhaGrey";
import { navItems } from "./BottomNavigation";
import _ from "lodash";

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
    <Box sx={{ position: "fixed", left: 0, right: 0, top: 0 }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "480px",
          minWidth: "320px",
          m: theme.spacing(0, "auto"),
          p: theme.spacing(0, 2),
          height: 56,
          display: "flex",
          alignItems: "center",
          backgroundColor: youhaGrey[900],
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
  ) : (
    <></>
  );
}
