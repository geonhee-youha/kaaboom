import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { theme } from "../../../themes/theme";
import { forArtistCss } from "../../../styles/styles";
import { Global } from "@emotion/react";
import youhaGrey from "../../../constants/youhaGrey";
import { useRecoilState } from "recoil";
import {
  dialogState,
  recordedVideoState,
  selectDrawerState,
  sideNavigationState,
} from "../../../constants/recoils";
import { sendMessage } from "../../../utils/sendMessage";
import { isIOS } from "react-device-detect";
import { useRouter } from "next/router";
import { fullscreenState } from "./VideoPlayer";

export default function Screen({
  header,
  loading,
  children,
}: {
  header?: React.ReactNode;
  loading?: boolean;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const [dialog, setDialog] = useRecoilState(dialogState);
  const [sideNavigation, setSideNavigation] =
    useRecoilState(sideNavigationState);
  const [selectDrawer, setSelectDrawer] = useRecoilState(selectDrawerState);
  const [fullscreen, setFullscreen] = useRecoilState(fullscreenState);
  useEffect(() => {
    if (!isIOS) {
      sendMessage({ name: "backEnable", body: "" });
      const finish = () => {
        if (dialog.open) {
          setDialog((prev) => {
            return { ...prev, open: false };
          });
        } else if (fullscreen.open) {
          setFullscreen((prev) => {
            return { ...prev, open: false };
          });
        } else if (sideNavigation.open) {
          setSideNavigation((prev) => {
            return { ...prev, open: false };
          });
        } else if (selectDrawer.open) {
          setSelectDrawer((prev) => {
            return { ...prev, open: false };
          });
        } else {
          router.back();
        }
      };
      window.addEventListener("androidBackhandle", finish);
      return () => {
        sendMessage({ name: "backAble", body: "" });
        window.removeEventListener("androidBackhandle", finish);
      };
    } else {
      sendMessage({ name: "backEnable", body: "" });
    }
  }, [dialog, sideNavigation]);
  return mounted ? (
    <>
      <Global styles={forArtistCss} />
      {header}
      <Box
        sx={{
          width: `100%`,
          minWidth: "280px",
          maxWidth: `480px`,
          m: theme.spacing(0, "auto"),
          minHeight: "100vh",
          p: theme.spacing(
            `calc(var(--sait) + 56px)`,
            0,
            `calc(var(--saib) + 96px)`,
            0
          ),
          height: loading ? "100%" : "auto",
          backgroundColor: youhaGrey[900],
        }}
      >
        {loading ? (
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>{children}</>
        )}
      </Box>
    </>
  ) : (
    <></>
  );
}
