import { Box, ButtonBase, Drawer, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { theme } from "../../../themes/theme";
import TextButton from "../../atoms/TextButton";
import youhaGrey from "../../../constants/youhaGrey";
import { useRecoilState } from "recoil";
import { selectDrawerState } from "../../../constants/recoils";
import Link from "next/link";
import { artistsMenus, globalMenus } from "../../../constants";
import Icon from "../../atoms/Icon";
import { useRouter } from "next/router";

export default function SelectDrawer({}: {}) {
  const router = useRouter();
  const [selectDrawer, setSelectDrawer] = useRecoilState(selectDrawerState);
  const { open, id } = selectDrawer;
  const onClose = () => {
    setSelectDrawer({ open: false, id: "" });
  };
  const onClickRecord = () => {
    onClose();
    router.push(
      {
        query: { ...router.query, recordVideoId: id },
      },
      undefined,
      { shallow: true }
    );
  };
  const onChangeVideo = () => {
    onClose();
  };
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiBackdrop-root": {
          // backdropFilter: `blur(4px)`,
          // backgroundColor: alpha(youhaGrey[900], 0.7),
        },
        "& .MuiDrawer-paper": {
          backgroundColor: youhaGrey[700],
          backgroundImage: `none`,
          width: "100%",
          maxWidth: "480px",
          m: theme.spacing(0, "auto"),
          p: theme.spacing(`var(--sait)`, 0, `var(--saib)`, 0),
          borderTopRightRadius: 8,
          borderTopLeftRadius: 8,
        },
        position: "fixed",
        zIndex: 999999,
      }}
    >
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
            alignItems: "center",
          }}
          disableRipple
          onClick={onClickRecord}
        >
          <Icon name="camera" prefix="far" size={20} />
          <Typography
            sx={{
              flex: 1,
              m: theme.spacing(0, 0, 0, 2),
              fontSize: 14,
              lineHeight: "20px",
            }}
          >
            Record with camera
          </Typography>
        </ButtonBase>
        <input
          type="file"
          accept="video/mp4, video/mkv, video/x-m4v, video/*"
          id={`file-picker`}
          onChange={onChangeVideo}
          style={{ display: "none" }}
        />
        <label htmlFor={`file-picker`}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              p: theme.spacing(1.5, 2),
            }}
          >
            <Icon name="folder" prefix="far" size={20} />
            <Typography
              sx={{
                flex: 1,
                m: theme.spacing(0, 0, 0, 2),
                fontSize: 14,
                lineHeight: "20px",
              }}
            >
              Select in gallery
            </Typography>
          </Box>
        </label>
      </Box>
    </Drawer>
  );
}
