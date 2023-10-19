import { useRouter } from "next/router";
import { Box, ButtonBase, Stack, Typography, alpha } from "@mui/material";
import { theme } from "../../../themes/theme";
import youhaGrey from "../../../constants/youhaGrey";
import IconButton from "../../atoms/IconButton";
import {
  OrderProps,
  dialogState,
  recordedVideoState,
  requestsState,
  tempOrders,
  tempSendVideoIdState,
  tempUsers,
} from "../../../constants/recoils";
import _ from "lodash";
import React, {
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import moment from "moment";
import { toOrFromTypes, videoTypes } from "../../../data";
import Slider from "../../atoms/forArtist/Slider";
import { atom, useRecoilState } from "recoil";
import { orderStates } from "../../../constants";
import youhaBlue from "../../../constants/youhaBlue";
import { cyan, deepOrange, red } from "@mui/material/colors";
import Typo from "../../atoms/Typo";
import User from "../../atoms/forArtist/User";
import { comma } from "../../../utils";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import VideoPlayer from "../../atoms/forArtist/VideoPlayer";

const mimeType = 'video/webm; codecs="opus,vp8"';

export default function SendVideoSlide() {
  const [requests, setRequests] = useRecoilState(requestsState);
  const [tempSendVideoId, setTempSendVideoId] =
    useRecoilState(tempSendVideoIdState);
  const router = useRouter();
  const { sendVideoId } = router.query;
  const open = typeof sendVideoId === "string";
  const [item, setItem] = useState<OrderProps | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  function getZIndex(query: string) {
    let queryArr = Object.entries(query);
    const index = _.findIndex(queryArr, (el) => el[0] === query);
    return index;
  }
  useEffect(() => {
    if (sendVideoId !== undefined && sendVideoId?.length > 0) {
      const newOrderId = sendVideoId.slice(sendVideoId.length - 1, 1);
      router.push({
        query: { ...router.query, sendVideoId: newOrderId },
      });
    }
    if (open) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, []);
  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
      setLoading(true);
      if (sendVideoId !== undefined) {
        const item =
          requests[_.findIndex(requests, (el) => el.id === sendVideoId)];
        if (_.findIndex(tempSendVideoId, (el) => el === sendVideoId) !== -1) {
          setItem(item);
          setLoading(false);
        } else {
          setTimeout(() => {
            setItem(item);
            setLoading(false);
            setTempSendVideoId([...tempSendVideoId, sendVideoId]);
          }, 350);
        }
      }
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, [open, requests]);
  return (
    <Slider
      open={open}
      direction="up"
      loading={loading}
      zIndex={getZIndex("sendVideoId")}
      fullscreen
    >
      {item ? <Inner open={open} /> : <></>}
    </Slider>
  );
}

function Inner({ open }: { open: boolean }) {
  const router = useRouter();
  const [recordedVideo, setRecordedVideo] = useRecoilState(recordedVideoState);
  const onClickSend = () => {};
  const onClickCancel = () => {
    router.back();
  };
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        "& video": {
          width: "100%",
          height: "100%",
          objectFit: "cover",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: "480px",
          minWidth: "320px",
          m: theme.spacing(0, "auto"),
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Header />
        <Box sx={{ flex: 1 }}>
          <VideoPlayer
            item={{ src: `${recordedVideo}` }}
            sx={{
              borderRadius: `0 !important`,
              width: "100%",
              height: "100%",
              aspectRatio: "initial",
            }}
          />
        </Box>
        <Stack
          direction={"row"}
          spacing={1.5}
          sx={{
            //   position: "fixed",
            //   left: 0,
            //   right: 0,
            //   bottom: 0,
            p: theme.spacing(2, 2, 2, 2),
          }}
        >
          <Button fullWidth size="lg" onClick={onClickSend}>
            Send video
          </Button>
          <Button
            fullWidth
            size="lg"
            backgroundColor={youhaGrey[600]}
            color={youhaGrey[300]}
            onClick={onClickCancel}
          >
            cancel
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

function Header({ label }: { label?: string }) {
  const router = useRouter();
  const onClickBack = () => {
    router.back();
  };
  return (
    <Box
      sx={
        {
          // position: "fixed",
          // left: 0,
          // right: 0,
          // top: 0,
          // zIndex: 999,
          // p: theme.spacing("var(--sait)", 0, 0, 0),
          // background: `linear-gradient(${alpha(youhaGrey[900], 0.4)}, ${alpha(
          //   youhaGrey[900],
          //   0
          // )})`,
        }
      }
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: "480px",
          minWidth: "320px",
          m: theme.spacing(0, "auto"),
          p: theme.spacing(0, 1),
          height: 56,
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton
          name="xmark-large"
          prefix="fas"
          size={20}
          onClick={onClickBack}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: `calc(100% - 108px)`,
            maxWidth: `calc(480px - 108px)`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 16,
              lineHeight: "32px",
              fontWeight: "700",
            }}
          >
            Send video
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
