import { AppBar, Box, Container } from "@mui/material";
import IconButton from "../atoms/IconButton";
import { theme } from "../../themes/theme";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function BackHeader({
  children,
}: {
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const onClickBack = () => {
    router.back();
  };
  return (
    <AppBar
      component="div"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        pt: "var(--sait)",
        borderBottomWidth: 1,
      }}
      elevation={0}
      className="Header"
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        className="BackHeaderBackground"
      />
      <Container
        sx={{
          transition: "all 0.5s ease",
          position: "relative",
          display: "flex",
          alignItems: "center",
          height: 56,
          maxWidth: router.asPath.includes("/projects/")
            ? "600px !important"
            : "1200px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            m: theme.spacing(0, 0, 0, -1.5),
          }}
        >
          <IconButton name="chevron-left" onClick={onClickBack} size={20} />
        </Box>
        <Box
          sx={{
            position: "absolute",
            left: 72,
            right: 72,
            top: 0,
            bottom: 0,
          }}
        >
          {children}
        </Box>
      </Container>
      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: `1px`,
        }}
        className="HeaderBottom"
      />
    </AppBar>
  );
}
