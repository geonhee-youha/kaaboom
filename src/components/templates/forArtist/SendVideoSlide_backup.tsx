import { useRouter } from "next/router";
import { Box, ButtonBase, Stack, Typography, alpha } from "@mui/material";
import { theme } from "../../../themes/theme";
import youhaGrey from "../../../constants/youhaGrey";
import IconButton from "../../atoms/IconButton";
import {
  OrderProps,
  dialogState,
  requestsState,
  tempOrders,
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

const tempSendVideoIdState = atom<string[]>({
  key: "tempSendVideoIdState_backup",
  default: [],
});

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
  }, []);
  useEffect(() => {
    if (open) {
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
    }
  }, [open, router, requests]);
  return (
    <Slider
      open={open}
      direction="up"
      loading={loading}
      zIndex={getZIndex("sendVideoId")}
      pb={20}
    >
      {item ? <Inner open={open} /> : <></>}
    </Slider>
  );
}

function Inner({ open }: { open: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const videoChunks = useRef<Blob[]>([]);
  const [recording, setRecording] = useState<boolean>(false);
  const getMediaPermission = useCallback(async () => {
    try {
      const audioConstraints = { audio: true };
      const videoConstraints = {
        audio: false,
        video: true,
      };

      const audioStream = await navigator.mediaDevices.getUserMedia(
        audioConstraints
      );
      const videoStream = await navigator.mediaDevices.getUserMedia(
        videoConstraints
      );

      if (videoRef.current) {
        videoRef.current.srcObject = videoStream;
      }

      // MediaRecorder 추가
      const combinedStream = new MediaStream([
        ...videoStream.getVideoTracks(),
        ...audioStream.getAudioTracks(),
      ]);

      const recorder = new MediaRecorder(combinedStream, {
        mimeType: "video/webm",
      });

      recorder.ondataavailable = (e) => {
        if (typeof e.data === "undefined") return;
        if (e.data.size === 0) return;
        videoChunks.current.push(e.data);
      };

      mediaRecorder.current = recorder;
    } catch (err) {
      alert(err);
    }
  }, [open]);

  useEffect(() => {
    getMediaPermission();
  }, []);
  useEffect(() => {
    if (open) getMediaPermission();
  }, [open]);
  const onClickRecord = () => {
    setRecording(!recording);
    if (recording) {
      mediaRecorder.current?.stop();
    } else {
      mediaRecorder.current?.start();
    }
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
      <Header />
      <video ref={videoRef} autoPlay />
      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          p: theme.spacing(0, 0, "calc(var(--saib) + 32px)", 0),
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "480px",
            minWidth: "320px",
            m: theme.spacing(0, "auto"),
            height: 56,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ButtonBase
            sx={{
              width: 64,
              height: 64,
              border: `2px solid #ffffff`,
              borderRadius: "50%",
              overflow: "hidden",
              p: theme.spacing(recording ? 0.5 : 0),
              transition: `all 0.15s ease`,
            }}
            onClick={onClickRecord}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                backgroundColor: recording ? red["A400"] : "#ffffff",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            />
          </ButtonBase>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  const router = useRouter();
  const onClickBack = () => {
    router.back();
  };
  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 999,
        p: theme.spacing("var(--sait)", 0, 0, 0),
        background: `linear-gradient(${alpha(youhaGrey[900], 0.4)}, ${alpha(
          youhaGrey[900],
          0
        )})`,
      }}
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
