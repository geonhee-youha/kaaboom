import _ from "lodash";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/users";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Container,
  Typography,
} from "@mui/material";
import { bottomTabs } from "../../constants";
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

export default function BottomNav() {
  const router = useRouter();
  const user = useRecoilValue(userState);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    router.push(newValue);
  };
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted ? (
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
                    {item.label}
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
                        <User item={user} size={24} />
                      </Box>
                    ) : (
                      <Icon
                        prefix={active ? "fas" : "fal"}
                        name={item.name}
                        size={20}
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
