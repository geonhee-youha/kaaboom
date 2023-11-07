import _ from "lodash";
import {
  AppBar,
  Box,
  ButtonBase,
  Container,
  Dialog,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import IconButton from "../atoms/IconButton";
import Visual from "../atoms/Visual";
import { grey } from "@mui/material/colors";
import { theme } from "../../themes/theme";
import { useRouter } from "next/router";
import { getCountryFlagEmoji } from "../../utils";
import { CountryCode } from "../../constants/country";
import { bottomTabs } from "./BottomNav";

export default function MainHeader() {
  const [open, setOpen] = useState<boolean>(false);
  const onClickSearch = () => {};
  const onClickBell = () => {};
  const onClickGlobe = () => {
    setOpen(!open);
  };
  const router = useRouter();
  const { en } = router.query;
  const handleClose = () => {
    setOpen(false);
  };
  const active = bottomTabs.flatMap((el) => el.value).includes(router.pathname);
  return active ? (
    <>
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
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          className="HeaderBackground"
        />
        <Container
          sx={{
            transition: "all 0.5s ease",
            position: "relative",
            display: "flex",
            alignItems: "center",
            height: 56,
          }}
        >
          <Box
            sx={{
              flex: 1,
            }}
          >
            <Visual
              src="/logos/logo-colored.svg"
              sx={{
                "& img": {
                  width: "auto !important",
                  height: `20px !important`,
                },
              }}
              forceShow
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              m: theme.spacing(0, -1, 0, 0),
            }}
          >
            <IconButton name="search" onClick={onClickSearch} />
            <IconButton name="bell" onClick={onClickBell} />
            <Box
              sx={{
                position: "relative",
              }}
            >
              <IconButton name="globe" onClick={onClickGlobe} />
              <Paper
                elevation={10}
                sx={{
                  position: "absolute",
                  top: 40,
                  right: 4,
                  display: open ? "block" : "none",
                }}
              >
                {languages.map((item, index) => {
                  const handleClick = () => {
                    router.push({
                      query:
                        item.value === "KR"
                          ? { ...router.query, en: undefined }
                          : { ...router.query, en: true },
                    });
                    handleClose();
                  };
                  return (
                    <ButtonBase
                      sx={{
                        display: "flex",
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                        p: theme.spacing(0, 2),
                      }}
                      key={index}
                      onClick={handleClick}
                    >
                      <Typography
                        sx={{
                          fontSize: 16,
                          lineHeight: "16px",
                          m: theme.spacing(0, 1, 0, 0),
                        }}
                      >
                        {getCountryFlagEmoji(item.value)}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 12,
                          lineHeight: "16px",
                        }}
                      >
                        {item.label}
                      </Typography>
                    </ButtonBase>
                  );
                })}
              </Paper>
            </Box>
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
    </>
  ) : (
    <></>
  );
}

const languages: { label: string; value: CountryCode }[] = [
  {
    label: "KOR",
    value: "KR",
  },
  {
    label: "ENG",
    value: "US",
  },
];
