import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { theme } from "../../themes/theme";
import { useRouter } from "next/router";
import youhaGrey from "../../constants/youhaGrey";
import { forFanCss } from "../../styles/styles";
import { Global } from "@emotion/react";

export default function Page({
  fixed,
  needId,
  aside,
  asideReverse,
  narrow,
  children,
}: {
  fixed?: boolean;
  needId?: boolean;
  aside?: boolean;
  asideReverse?: boolean;
  narrow?: boolean;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const { id } = router.query;
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted &&
    (needId ? id !== "" && id !== undefined && id !== null : true) ? (
    <>
      <Global styles={forFanCss} />
      <Box
        sx={
          narrow
            ? {
                width: `100%`,
                minWidth: "280px",
                maxWidth: `480px`,
                minHeight: "60vh",
                m: theme.spacing(0, "auto"),
                p: theme.spacing(0, 0, 12, 0),
              }
            : aside || asideReverse
            ? {
                display: "flex",
                width: `100%`,
                minWidth: "280px",
                maxWidth: `1280px`,
                m: theme.spacing(0, "auto"),
                minHeight: "60vh",
                flexDirection: asideReverse ? "column-reverse" : "column",
                "@media(min-width: 960px)": {
                  flexDirection: asideReverse ? "row-reverse" : "row",
                },
                "& > *:nth-of-type(1)": {
                  width: "100%",
                  "@media(min-width: 960px)": {
                    width: 420,
                    display: "block",
                    p: asideReverse
                      ? theme.spacing(0, 0, 12, 2)
                      : theme.spacing(0, 2, 12, 0),
                  },
                },
                "& > *:nth-of-type(2)": {
                  flex: 1,
                  p: theme.spacing(0, 0, 12, 0),
                  "@media(min-width: 960px)": {
                    width: `calc(100vw - 420px)`,
                    maxWidth: `calc(1280px - 420px)`,
                  },
                  width: "100%",
                },
              }
            : fixed
            ? {
                width: `100%`,
                minWidth: "280px",
                maxWidth: `1280px`,
                m: theme.spacing(0, "auto"),
                minHeight: "60vh",
                p: theme.spacing(0, 0, 12, 0),
                "@media(min-width: 960px)": {
                  height: `calc(100vh - 56px)`,
                  maxWidth: `initial`,
                  minHeight: "initial",
                  backgroundColor: youhaGrey[900],
                  p: theme.spacing(
                    0,
                    `calc((100vw - 1280px) / 2)`,
                    12,
                    `calc((100vw - 1280px) / 2)`
                  ),
                  overflowY: "auto",
                },
              }
            : {
                width: `100%`,
                minWidth: "280px",
                maxWidth: `1280px`,
                m: theme.spacing(0, "auto"),
                minHeight: "60vh",
                p: theme.spacing(0, 0, 12, 0),
              }
        }
      >
        {children}
      </Box>
    </>
  ) : (
    <Box sx={{ minHeight: "100vh" }} />
  );
}
