import { Box, ButtonBase, Drawer, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { theme } from "../../../themes/theme";
import TextButton from "../../atoms/TextButton";
import youhaGrey from "../../../constants/youhaGrey";
import { useRecoilState } from "recoil";
import { sideNavigationState } from "../../../constants/recoils";
import Link from "next/link";
import { artistsMenus, globalMenus } from "../../../constants";
import Icon from "../../atoms/Icon";

export default function SideNavigation({}: {}) {
  const [sideNavigation, setSideNavigation] =
    useRecoilState(sideNavigationState);
  const { open } = sideNavigation;
  const onClose = () => {
    setSideNavigation({ open: false });
  };
  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiBackdrop-root": {
          // backdropFilter: `blur(4px)`,
          // backgroundColor: alpha(youhaGrey[900], 0.7),
        },
        "& .MuiDrawer-paper": {
          backgroundColor: youhaGrey[900],
          backgroundImage: `none`,
          width: "100%",
          maxWidth: 280,
          p: theme.spacing(`var(--sait)`, 0, `var(--saib)`, 0),
        },
        position: "fixed",
        zIndex: 999999,
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        sx={{
          height: 56,
          p: theme.spacing(0, 2),
          borderBottom: `1px solid ${youhaGrey[700]}`,
        }}
      >
        <Link href={"/"} passHref>
          <ButtonBase
            disableRipple
            sx={{
              height: 20,
              "& img": {
                width: "auto",
                height: `20px !important`,
              },
            }}
          >
            <img src="/logos/logo-colored.png" />
          </ButtonBase>
        </Link>
      </Stack>
      <Box
        sx={{
          p: theme.spacing(1, 0),
          m: theme.spacing("auto", 0, 0, 0),
        }}
      >
        <ButtonBase
          sx={{
            width: "100%",
            p: theme.spacing(1.5, 2),
          }}
        >
          <Icon name="power-off" prefix="far" size={20} />
          <Typography
            sx={{
              flex: 1,
              m: theme.spacing(0, 0, 0, 2),
              fontSize: 14,
              lineHeight: "20px",
            }}
          >
            Log out
          </Typography>
        </ButtonBase>
      </Box>
    </Drawer>
  );
}
