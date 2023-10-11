import { Box, ButtonBase, Drawer, Stack } from "@mui/material";
import { useState } from "react";
import { theme } from "../../themes/theme";
import TextButton from "../atoms/TextButton";
import youhaGrey from "../../constants/youhaGrey";
import { useRecoilState } from "recoil";
import { sideDrawerRecoilState } from "../../constants/recoils";
import Link from "next/link";
import { artistsMenus, globalMenus } from "../../constants";
import Icon from "../atoms/Icon";

function NavItem({ item }: { item: { link: string; label: string } }) {
  const [sideDrawer, setSideDrawer] = useRecoilState(sideDrawerRecoilState);
  const [open, setOpen] = useState<boolean>(false);
  const onClick = () => {
    setOpen(!open);
  };
  const onClose = () => {
    setOpen(false);
    setSideDrawer({ open: false });
  };
  return item.label === "Artists" ? (
    <>
      <TextButton
        size={"lg"}
        label={item.label}
        fontWeight={"500"}
        disableRipple
        onClick={onClick}
        fullWidth
      >
        <Icon
          name="angle-down"
          prefix="fas"
          size={20}
          sx={{
            transition: `all 0.35s ease`,
            transform: `rotate(${open ? 180 : 0}deg)`,
            m: theme.spacing(0, 0, 0, "auto"),
          }}
        />
      </TextButton>
      <Stack
        alignItems={"flex-start"}
        sx={{
          width: "100%",
          overflow: "hidden",
          height: open ? 48 * 3 + 8 : 0,
          transition: `all 0.35s ease`,
          p: theme.spacing(0, 1),
        }}
      >
        {artistsMenus.map((item, index) => {
          return (
            <Link key={index} href={`${item.link}`} passHref>
              <TextButton
                size={"lg"}
                label={item.label}
                fontWeight={"400"}
                disableRipple
                color={youhaGrey[300]}
                onClick={onClose}
              >
                <Box
                  sx={{
                    m: theme.spacing(0, 0, 0, "auto"),
                  }}
                />
              </TextButton>
            </Link>
          );
        })}
      </Stack>
    </>
  ) : (
    <Link href={`${item.link}`} passHref>
      <TextButton
        size={"lg"}
        label={item.label}
        fontWeight={"500"}
        disableRipple
        onClick={onClose}
      >
        <Box
          sx={{
            m: theme.spacing(0, 0, 0, "auto"),
          }}
        />
      </TextButton>
    </Link>
  );
}

export default function SideDrawer({}: {}) {
  const [sideDrawer, setSideDrawer] = useRecoilState(sideDrawerRecoilState);
  const { open } = sideDrawer;
  const onClose = () => {
    setSideDrawer({ open: false });
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
      <Stack
        sx={{
          p: theme.spacing(1, 0),
        }}
      >
        {globalMenus.map((item, index) => {
          return <NavItem key={index} item={item} />;
        })}
      </Stack>
    </Drawer>
  );
}
