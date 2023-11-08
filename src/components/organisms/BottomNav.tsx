import _ from "lodash";
import { useRecoilValue } from "recoil";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Container,
  Typography,
} from "@mui/material";
import Icon from "../atoms/Icon";
import User from "../atoms/User";
import { theme } from "../../themes/theme";
import { useRouter } from "next/router";
import {
  amber,
  cyan,
  deepOrange,
  deepPurple,
  grey,
  lightBlue,
  lime,
  purple,
  teal,
  yellow,
} from "@mui/material/colors";
import { useEffect, useState } from "react";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { usePreserveScroll } from "../../hooks/usePreserveScroll";

export const bottomTabs: BottomTabsProps[] = [
  {
    label: { ko: "홈", en: "Home" },
    value: "/home",
    name: "house",
  },
  {
    label: { ko: "둘러보기", en: "Exlpore" },
    value: "/explore",
    name: "compass",
  },
  {
    label: { ko: "랭킹", en: "ranking" },
    value: "/ranking",
    name: "trophy-star",
  },
  {
    label: { ko: "즐겨찾기", en: "Favorite" },
    value: "/favorite",
    name: "star",
  },
  {
    label: { ko: "마이카붐", en: "Account" },
    value: "/account",
    name: "user",
  },
];

export type BottomTabsProps = {
  label: { ko: string; en: string };
  value: string;
  name: IconName;
};

export default function BottomNav() {
  const router = useRouter();
  const { en } = router.query;
  const { scrollPositions } = usePreserveScroll();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    router.push({ pathname: newValue, query: { en: en } });
  };
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const active = bottomTabs.flatMap((el) => el.value).includes(router.pathname);
  return mounted && active ? (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
        borderTop: `1px solid ${grey[900]}`,
      }}
    >
      <Container
        sx={{
          transition: "all 0.5s ease",
          p: `0 !important`,
        }}
      >
        <BottomNavigation
          showLabels
          onChange={handleChange}
          sx={{
            minHeight: 56,
            backgroundColor: `#121212`,
            p: theme.spacing(0, 0, `calc(var(--saib))`, 0),
            overflow: "hidden",
          }}
        >
          {bottomTabs.map((item, index) => {
            const active = router.pathname === item.value;
            const color = active ? "#ffffff" : grey[700];
            // const color = active ? lime[500] : grey[700];
            return (
              <BottomNavigationAction
                key={index}
                label={
                  <Typography
                    sx={{
                      fontSize: 10,
                      lineHeight: "14px",
                      fontWeight: "400 !important",
                      color: color,
                    }}
                  >
                    {en === "true" ? item.label.en : item.label.ko}
                  </Typography>
                }
                value={item.value}
                icon={
                  <Box
                    sx={{
                      m: theme.spacing(0, 0, 0.5, 0),
                    }}
                  >
                    {item.name === "users" ? (
                      <Box
                        sx={{
                          borderRadius: "50% !important",
                          overflow: "hidden",
                          width: 24,
                          height: 24,
                          border: `2px solid ${color}`,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {/* */}
                      </Box>
                    ) : (
                      <Icon
                        // prefix={active ? "fas" : "fal"}
                        prefix="fas"
                        name={item.name}
                        size={item.value === "/ranking" ? 20 : 20}
                        color={color}
                      />
                    )}
                  </Box>
                }
                sx={{
                  minHeight: 56,
                  minWidth: 0,
                  transition: `all 0.5s ease`,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            );
          })}
        </BottomNavigation>
      </Container>
    </Box>
  ) : (
    <></>
  );
}
