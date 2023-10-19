import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { theme } from "../../../themes/theme";
import { forArtistCss } from "../../../styles/styles";
import { Global } from "@emotion/react";
import youhaGrey from "../../../constants/youhaGrey";

export default function Screen({
  header,
  loading,
  children,
}: {
  header?: React.ReactNode;
  loading?: boolean;
  children?: React.ReactNode;
}) {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted ? (
    <>
      <Global styles={forArtistCss} />
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
    </>
  ) : (
    <></>
  );
}
