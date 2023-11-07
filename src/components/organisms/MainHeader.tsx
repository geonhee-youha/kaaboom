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

export default function MainHeader() {
  const [open, setOpen] = useState<boolean>(false);
  const onClickSearch = () => {};
  const onClickBell = () => {};
  const onClickGlobe = () => {
    setOpen(true);
  };
  return (
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
        className="Header"
      >
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
          <Box sx={{ m: theme.spacing(0, -1, 0, 0) }}>
            <IconButton name="search" onClick={onClickSearch} />
            <IconButton name="bell" onClick={onClickBell} />
            <IconButton name="globe" onClick={onClickGlobe} />
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
      <LanguageDialog open={open} setOpen={setOpen} />
    </>
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

function LanguageDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const { en } = router.query;
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <Box>
        {languages.map((item, index) => {
          const handleClick = () => {
            router.push({
              query: en
                ? { ...router.query, en: undefined }
                : { ...router.query, en: true },
            });
            handleClose();
          };
          return (
            <ButtonBase
              sx={{
                width: "100%",
                height: 44,
                justifyContent: "center",
                alignItems: "center",
              }}
              key={index}
              onClick={handleClick}
            >
              <Typography
                sx={{
                  fontSize: 20,
                  lineHeight: "20px",
                  m: theme.spacing(0, 1, 0, 0),
                }}
              >
                {getCountryFlagEmoji(item.value)}
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: "20px",
                }}
              >
                {item.label}
              </Typography>
            </ButtonBase>
          );
        })}
      </Box>
    </Dialog>
  );
}
