import {
  Box,
  ButtonBase,
  Paper,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import IconButton from "../atoms/IconButton";
import { theme } from "../../themes/theme";
import youhaBlue from "../../constants/youhaBlue";
import youhaGrey from "../../constants/youhaGrey";
import Link from "next/link";
import TextButton from "../atoms/TextButton";
import { useRecoilState } from "recoil";
import {
  searchDialogRecoilState,
  sideDrawerRecoilState,
} from "../../constants/recoils";
import { artistsMenus, globalMenus } from "../../constants";
import { useState } from "react";
import Icon from "../atoms/Icon";

function NavItem({ item }: { item: { link: string; label: string } }) {
  const [open, setOpen] = useState<boolean>(false);
  const onClick = () => {
    setOpen(!open);
  };
  return item.label === "Artists" ? (
    <Box
      sx={{
        position: "relative",
        "& .Icon": {
          transform: `rotate(0deg)`,
        },
        "&:hover": {
          "& .Stack": {
            display: "flex",
          },
          "& .Icon": {
            transform: `rotate(180deg)`,
          },
        },
      }}
    >
      <Link href={`${item.link}`} passHref>
        <TextButton
          size={"lg"}
          label={item.label}
          fontWeight={"700"}
          disableRipple
          onClick={onClick}
          fullWidth
        >
          <Icon
            name="chevron-down"
            prefix="fas"
            size={20}
            className="Icon"
            sx={{
              transition: `all 0.35s ease`,
              m: theme.spacing(0, 0, 0, 1),
            }}
          />
        </TextButton>
      </Link>
      <Paper
        elevation={6}
        sx={{
          display: "none",
          position: "absolute",
          left: -8,
          top: 48,
          transition: `all 0.35s ease`,
          p: theme.spacing(0, 1),
          backgroundColor: youhaGrey[800],
          backgroundImage: "none",
          border: `1px solid ${youhaGrey[700]}`,
        }}
        className="Stack"
      >
        <Stack
          sx={{
            minWidth: 200,
            p: theme.spacing(1, 0),
          }}
        >
          {artistsMenus.map((item, index) => {
            return (
              <TextButton
                size={"lg"}
                label={item.label}
                fontWeight={"400"}
                // disableRipple
                // color={youhaGrey[300]}
                // onClick={onClick}
              >
                <Box
                  sx={{
                    m: theme.spacing(0, 0, 0, "auto"),
                  }}
                />
              </TextButton>
            );
          })}
        </Stack>
      </Paper>
    </Box>
  ) : (
    <Link href={`${item.link}`} passHref>
      <TextButton
        size={"lg"}
        label={item.label}
        fontWeight={"700"}
        disableRipple
      />
    </Link>
  );
}

export default function GlobalHeader() {
  const [searchDialog, setSearchDialog] = useRecoilState(
    searchDialogRecoilState
  );
  const [sideDrawer, setSideDrawer] = useRecoilState(sideDrawerRecoilState);
  const onClickBars = () => {
    setSideDrawer({ open: true });
  };
  const onClickSearch = () => {
    setSearchDialog({ open: true });
  };
  const onClickSignin = () => {};
  return (
    <>
      <Box
        sx={{
          height: 120,
          "@media(min-width: 768px)": {
            height: 56,
          },
        }}
      />
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          borderBottom: `1px solid ${youhaGrey[700]}`,
          backgroundColor: alpha(youhaGrey[900], 0.8),
          backdropFilter: `blur(8px)`,
          zIndex: 99999,
          "@media(min-width: 768px)": {
            display: "flex",
          },
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={1}
          sx={{
            display: "flex",
            height: 56,
            p: theme.spacing(0, 2),
            "@media(min-width: 768px)": {
              display: "flex",
              flex: 1,
            },
          }}
        >
          <IconButton
            name="bars"
            borderColor={youhaGrey[700]}
            color={youhaBlue[400]}
            onClick={onClickBars}
            size={20}
            sx={{
              "@media(min-width: 1280px)": {
                display: "none",
              },
            }}
          />
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              p: theme.spacing(0, 1),
              "@media(min-width: 768px)": {
                flex: "initial",
                justifyContent: "flex-start",
              },
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
          </Box>
          <Stack
            direction={"row"}
            spacing={0}
            sx={{
              display: "none",
              "@media(min-width: 1280px)": {
                display: "flex",
              },
            }}
          >
            {globalMenus.map((item, index) => {
              return <NavItem key={index} item={item} />;
            })}
          </Stack>
          <IconButton
            name="user"
            borderColor={youhaGrey[700]}
            color={youhaBlue[400]}
            onClick={() => {}}
            size={20}
            sx={{
              "@media(min-width: 768px)": {
                display: "none",
              },
            }}
          />
        </Stack>
        <Stack
          direction={"row"}
          spacing={2}
          sx={{
            p: theme.spacing(1, 2, 2, 2),
            "@media(min-width: 768px)": {
              p: theme.spacing(1, 2, 1, 2),
            },
          }}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            sx={{
              flex: 1,
            }}
          >
            <Box
              sx={{
                flex: 1,
                position: "relative",
              }}
            >
              <IconButton
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 40,
                  height: 40,
                  zIndex: 99,
                }}
                disableRipple
                name="search"
                size={20}
                color={youhaBlue[400]}
              />
              <ButtonBase
                onClick={onClickSearch}
                sx={{
                  borderRadius: 1,
                  border: `1px solid ${youhaGrey[700]}`,
                  backgroundColor: alpha(youhaGrey[800], 1),
                  width: "100%",
                  height: 40,
                  p: theme.spacing(0, 5, 0, 5),
                  alignItems: "center",
                  "@media(min-width: 768px)": {
                    minWidth: 280,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 16,
                    lineHeight: "24px !important",
                    color: youhaGrey[400],
                  }}
                >
                  Search for Kpop idols
                </Typography>
              </ButtonBase>
            </Box>
          </Stack>
          <TextButton
            size="md"
            label="Log in"
            borderColor={youhaGrey[700]}
            // backgroundColor={alpha(youhaGrey[800], 1)}
            color={youhaBlue[400]}
            onClick={onClickSignin}
            sx={{
              display: "none",
              "@media(min-width: 768px)": {
                display: "flex",
              },
            }}
          />
        </Stack>
      </Box>
    </>
  );
}
