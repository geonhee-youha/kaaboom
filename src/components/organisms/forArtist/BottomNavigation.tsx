import { IconName } from "@fortawesome/fontawesome-svg-core";
import { Box, ButtonBase, Typography } from "@mui/material";
import Icon from "../../atoms/Icon";
import { useRouter } from "next/router";
import youhaBlue from "../../../constants/youhaBlue";
import youhaGrey from "../../../constants/youhaGrey";
import { useEffect, useState } from "react";
import { theme } from "../../../themes/theme";
import Visual from "../../atoms/Visual";
import { tempArtist } from "../../../data/temp";
import { isIOS } from "react-device-detect";

export type NavItemProps = {
  url: string;
  icon: IconName;
  label: string;
};

export const navItems: NavItemProps[] = [
  {
    url: "/requests",
    icon: "cabinet-filing",
    label: "Requests",
  },
  {
    url: "/messages",
    icon: "box-heart",
    label: "Messages",
  },
  {
    url: "/followers",
    icon: "users",
    label: "Followers",
  },
  {
    url: "/profile",
    icon: "user",
    label: "Profle",
  },
];

function NavItem({ item }: { item: NavItemProps }) {
  const router = useRouter();
  const pathnames = router.pathname.split("/");
  const pathname = pathnames[2];
  const focused =
    pathname === item.url.replace("/", "") ||
    (pathname === undefined && item.url === "/");
  const color = focused ? youhaBlue[500] : youhaGrey[100];
  const opacity = focused ? 1 : 0.3;
  const onClick = () => {
    router.push(`/forArtist${item.url}`);
  };
  return (
    <ButtonBase
      sx={{
        flex: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        opacity: opacity,
      }}
      onClick={onClick}
    >
      {item.icon !== "user" ? (
        <Icon
          name={item.icon}
          prefix={focused ? "fas" : "far"}
          color={color}
          size={28}
        />
      ) : (
        <Box
          sx={{
            borderRadius: "50%",
            width: 28,
            height: 28,
            border: `2px solid ${color}`,
            position: "relative",
            overflow: "hidden",
            "& img": {
              width: "auto",
              height: "100% !important",
            },
          }}
        >
          <Visual src={tempArtist.thumbnail} />
        </Box>
      )}
      <Typography
        sx={{
          fontSize: 10,
          lineHeight: "14px",
          color: color,
          fontWeight: "700",
          m: theme.spacing(0.5, 0, 0, 0),
        }}
      >
        {item.label}
      </Typography>
    </ButtonBase>
  );
}

export default function BottomNavigation() {
  const router = useRouter();
  const pathnames = router.pathname.split("/");
  const forArtist = pathnames[1] === "forArtist" && pathnames[2] !== 'detail';
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, [setMounted]);
  return mounted && forArtist ? (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: youhaGrey[900],
        zIndex: 999,
        p: theme.spacing("var(--sait)", 0, 0, 0),
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "480px",
          minWidth: "320px",
          m: theme.spacing(0, "auto"),
          height: 64,
          display: "flex",
          borderTop: `1px solid ${youhaGrey[700]}`,
        }}
      >
        {navItems.map((item, index) => (
          <NavItem key={index} item={item} />
        ))}
      </Box>
    </Box>
  ) : (
    <></>
  );
}
