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
  loginRecoilState,
  searchDialogRecoilState,
  sideDrawerRecoilState,
} from "../../constants/recoils";
import { artistsMenus, globalMenus } from "../../constants";
import { useEffect, useRef, useState } from "react";
import Icon from "../atoms/Icon";
import { useRouter } from "next/router";
import { tempUserState } from "../../data/temp";
import Visual from "../atoms/Visual";
import { cyan, deepPurple, indigo, pink } from "@mui/material/colors";

function NavItem({ item }: { item: { link: string; label: string } }) {
  const [open, setOpen] = useState<boolean>(false);
  const onClick = () => {
    setOpen(!open);
  };
  const onMouseOver = () => {
    setOpen(true);
  };
  const onMouseOut = () => {
    setOpen(false);
  };
  return item.label === "Artists" ? (
    <Box
      sx={{
        position: "relative",
      }}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
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
          className="Icon"
          sx={{
            transform: `rotate(${open ? 180 : 0}deg)`,
            transition: `all 0.35s ease`,
            m: theme.spacing(0, 0, 0, 1),
          }}
        />
      </TextButton>
      <Paper
        elevation={6}
        sx={{
          display: open ? "flex" : "none",
          position: "absolute",
          left: -8,
          top: 48,
          transition: `all 0.35s ease`,
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
              <Link key={index} href={`${item.link}`} passHref>
                <TextButton
                  size={"lg"}
                  label={item.label}
                  fontWeight={"400"}
                  onClick={onClick}
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
      </Paper>
    </Box>
  ) : (
    <Link href={`${item.link}`} passHref>
      <TextButton
        size={"lg"}
        label={item.label}
        fontWeight={"500"}
        disableRipple
      />
    </Link>
  );
}

const userMenus = [
  {
    url: "/user/account",
    label: "Account",
  },
  {
    url: "/user/favorites",
    label: "Favorites",
  },
  {
    url: "/user/orders",
    label: "Orders",
  },
  {
    url: "/user/videos",
    label: "Videos",
  },
];

function User() {
  const router = useRouter();
  const ref = useRef<any>(null);
  const [login, setLogin] = useRecoilState(loginRecoilState);
  const [tempUser, setTempUser] = useRecoilState(tempUserState);
  const [open, setOpen] = useState<boolean>(false);
  const onClick = () => {
    setOpen((prev) => !prev);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleClickOutside = (event: any) => {
    if (ref && !ref.current.contains(event.target)) {
      setOpen(false);
    }
  };
  const onClickLogout = () => {
    setLogin(false);
  };
  return (
    <Box
      ref={ref}
      sx={{
        position: "relative",
      }}
    >
      {tempUser.thumbnail ? (
        <ButtonBase onClick={onClick}>
          <Visual
            src={tempUser.thumbnail}
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              overflow: "hidden",
              backgroundColor: youhaGrey[800],
              border: `1px solid ${youhaGrey[600]}`,
            }}
          />
        </ButtonBase>
      ) : (
        <ButtonBase
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            overflow: "hidden",
            backgroundColor:
              tempUser.gender === "M"
                ? indigo["A400"]
                : tempUser.gender === "M"
                ? pink["A400"]
                : deepPurple["A400"],
            border: `1px solid ${youhaGrey[600]}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={onClick}
        >
          <Icon name="user" prefix="fas" color={youhaGrey[100]} />
        </ButtonBase>
      )}
      <Box
        ref={ref}
        sx={{
          position: "absolute",
          top: 32,
          right: 0,
          display: open ? "flex" : "none",
          boxShadow: `rgb(0 0 0 / 10%) 0px 2px 10px`,
          flexDirection: "column",
          p: theme.spacing(1, 0),
          zIndex: 9,
          backgroundColor: youhaGrey[800],
          border: `1px solid ${youhaGrey[600]}`,
          borderRadius: 0.5,
        }}
        className="languages"
      >
        {userMenus.map((item, index) => {
          const { url, label } = item;
          const onClick = () => {
            router.push(url);
            setOpen(false);
          };
          return (
            <Link key={index} href={`${item.url}`} passHref>
              <TextButton
                size={"lg"}
                label={item.label}
                fontWeight={"400"}
                onClick={onClick}
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
        <TextButton
          size={"lg"}
          label={"Log out"}
          fontWeight={"400"}
          onClick={onClickLogout}
        >
          <Box
            sx={{
              m: theme.spacing(0, 0, 0, "auto"),
            }}
          />
        </TextButton>
      </Box>
    </Box>
  );
}

export default function GlobalHeader() {
  const router = useRouter();
  const [login, setLogin] = useRecoilState(loginRecoilState);
  const [searchDialog, setSearchDialog] = useRecoilState(
    searchDialogRecoilState
  );
  console.log(router)
  const [sideDrawer, setSideDrawer] = useRecoilState(sideDrawerRecoilState);
  const onClickBars = () => {
    setSideDrawer({ open: true });
  };
  const onClickSearch = () => {
    setSearchDialog({ open: true });
  };
  const onClickSignin = () => {};
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, [setLoaded]);
  return loaded ? (
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
          <Box
            sx={{
              "@media(min-width: 768px)": {
                display: "none",
              },
            }}
          >
            {login ? (
              <User />
            ) : (
              <Link
              href={`/auth/login?url=${router.asPath.split('?')[0].replaceAll("/", "^")}`}
                passHref
              >
                <IconButton
                  name="user"
                  borderColor={youhaGrey[700]}
                  color={youhaBlue[400]}
                  onClick={() => {}}
                  size={20}
                />
              </Link>
            )}
          </Box>
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
          <Box
            sx={{
              display: "none",
              "@media(min-width: 768px)": {
                display: "flex",
              },
            }}
          >
            {login ? (
              <User />
            ) : (
              <Link
                href={`/auth/login?url=${router.asPath.split('?')[0].replaceAll("/", "^")}`}
                passHref
              >
                <TextButton
                  size="md"
                  label="Log in"
                  borderColor={youhaGrey[700]}
                  // backgroundColor={alpha(youhaGrey[800], 1)}
                  color={youhaBlue[400]}
                />
              </Link>
            )}
          </Box>
        </Stack>
      </Box>
    </>
  ) : null;
}
