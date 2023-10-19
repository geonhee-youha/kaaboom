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
  streamState,
  tempOrders,
  tempSendVideoIdState,
  tempUsers,
  videoChunksState,
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
import { cyan, deepOrange, red, yellow } from "@mui/material/colors";
import Typo from "../../atoms/Typo";
import User from "../../atoms/forArtist/User";
import { comma } from "../../../utils";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import Video from "../../atoms/Video";
import VideoPlayer from "../../atoms/forArtist/VideoPlayer";

const mimeType = 'video/webm; codecs="opus,vp8"';

export default function RecordVideoSlide() {
  const [requests, setRequests] = useRecoilState(requestsState);
  const [tempSendVideoId, setTempSendVideoId] =
    useRecoilState(tempSendVideoIdState);
  const router = useRouter();
  const { recordVideoId } = router.query;
  const open = typeof recordVideoId === "string";
  const [item, setItem] = useState<OrderProps | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  function getZIndex(query: string) {
    let queryArr = Object.entries(query);
    const index = _.findIndex(queryArr, (el) => el[0] === query);
    return index;
  }
  useEffect(() => {
    if (recordVideoId !== undefined && recordVideoId?.length > 0) {
      const newOrderId = recordVideoId.slice(recordVideoId.length - 1, 1);
      router.push({
        query: { ...router.query, recordVideoId: newOrderId },
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
      if (recordVideoId !== undefined) {
        const item =
          requests[_.findIndex(requests, (el) => el.id === recordVideoId)];
        if (_.findIndex(tempSendVideoId, (el) => el === recordVideoId) !== -1) {
          setItem(item);
          setLoading(false);
        } else {
          setTimeout(() => {
            setItem(item);
            setLoading(false);
            setTempSendVideoId([...tempSendVideoId, recordVideoId]);
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
      zIndex={getZIndex("recordVideoId")}
      pb={20}
    >
      {item ? <Inner open={open} id={recordVideoId} /> : <></>}
    </Slider>
  );
}
function timer(seconds: number) {
  var hour = String(parseInt(`${seconds / 3600}`)).padStart(2, "0");
  var min = String(parseInt(`${(seconds % 3600) / 60}`)).padStart(2, "0");
  var sec = String(seconds % 60).padStart(2, "0");
  return `${hour}:${min}:${sec}`;
}

function Inner({
  open,
  id,
}: {
  open: boolean;
  id: string | string[] | undefined;
}) {
  const timerRef = useRef<any>();
  const [count, setCount] = useState<number>(1);
  const handleCount = () => {
    setCount(count + 1);
  };
  const handleRestart = () => {
    setCount(1);
    if (!timerRef.current) {
      timerRef.current = setInterval(handleCount, 1000);
    }
  };
  const handleStop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  useEffect(() => {
    timerRef.current = setInterval(handleCount, 1000);
    return () => {
      clearInterval(timerRef.current);
    };
  });
  const mediaRecorder = useRef<any>(null);
  const liveVideoFeed = useRef<any>(null);
  const [permission, setPermission] = useState<boolean>(false);
  const [recording, setRecording] = useState<string>("inactive");
  const [stream, setStream] = useRecoilState(streamState);
  const [recordedVideo, setRecordedVideo] = useRecoilState(recordedVideoState);
  const [videoChunks, setVideoChunks] = useRecoilState(videoChunksState);
  //   const [stream, setStream] = useState<any>(null);
  //   const [recordedVideo, setRecordedVideo] = useState<any>(null);
  //   const [videoChunks, setVideoChunks] = useState<any>([]);
  const onClickRecord = () => {
    if (recording === "inactive" && permission === true) {
      startRecording();
    } else if (recording === "recording") {
      stopRecording();
    }
  };
  const getCameraPermission = async () => {
    setRecordedVideo(null);
    //get video and audio permissions and then stream the result media stream to the videoSrc variable
    if ("MediaRecorder" in window) {
      try {
        const videoConstraints = {
          audio: false,
          video: true,
        };
        const audioConstraints = { audio: true };
        // create audio and video streams separately
        const audioStream = await navigator.mediaDevices.getUserMedia(
          audioConstraints
        );
        const videoStream = await navigator.mediaDevices.getUserMedia(
          videoConstraints
        );
        setPermission(true);
        //combine both audio and video streams
        const combinedStream = new MediaStream([
          ...videoStream.getVideoTracks(),
          ...audioStream.getAudioTracks(),
        ]);
        setStream(combinedStream);
        //set videostream to live feed player
        if (videoStream) liveVideoFeed.current.srcObject = videoStream;
      } catch (err: any) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    setRecording("recording");
    const media = new MediaRecorder(stream, { mimeType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();
    let localVideoChunks: any[] = [];
    mediaRecorder.current.ondataavailable = (event: any) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      console.log(event.data);
      localVideoChunks.push(event.data);
    };
    setVideoChunks(localVideoChunks);
  };

  const stopRecording = () => {
    setPermission(false);
    setRecording("waiting");
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const videoBlob = new Blob(videoChunks, { type: mimeType });
      const videoUrl = URL.createObjectURL(videoBlob);
      console.log(videoUrl);
      setRecordedVideo(videoUrl);
      setVideoChunks([]);
    };
  };
  //   useEffect(() => {
  //     getCameraPermission();
  //   }, []);
  //   useEffect(() => {
  //     if (open) {
  //       getCameraPermission();
  //     } else {
  //       if (mediaRecorder) mediaRecorder.current?.stop();
  //       setRecordedVideo(null);
  //       setRecordedVideo(null);
  //       setVideoChunks([]);
  //     }
  //   }, [open]);
  useEffect(() => {
    getCameraPermission();
  }, []);
  const router = useRouter();
  useEffect(() => {
    if (
      recording === "waiting" &&
      recordedVideo !== null &&
      recordedVideo !== undefined &&
      recordedVideo !== ""
    ) {
      router.push(
        {
          query: { ...router.query, sendVideoId: id },
        },
        undefined,
        { shallow: true }
      );
      setRecording("inactive");
    }
  }, [recordedVideo]);
  return (
    <>
      <Box
        sx={{
          position: "absolute",
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
          display: "flex",
        }}
      >
        <Header
          label={recording === "recording" ? timer(count) : "Record Video"}
        />
        <video ref={liveVideoFeed} autoPlay />
        <Box
          sx={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            p: theme.spacing(0, 0, "calc(var(--saib) + 32px)", 0),
            zIndex: 999,
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
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Box>
            <ButtonBase
              sx={{
                width: 64,
                height: 64,
                border: `2px solid #ffffff`,
                borderRadius: "50%",
                overflow: "hidden",
                p: theme.spacing(recording === "active" ? 0.5 : 0),
                transition: `all 0.15s ease`,
              }}
              onClick={onClickRecord}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundColor:
                    recording === "recording" ? red["A400"] : "#ffffff",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              />
            </ButtonBase>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {recordedVideo && recording !== "recording" && (
                <ButtonBase
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 1,
                    overflow: "hidden",
                    border: `1px solid ${alpha("#ffffff", 0.6)}`,
                  }}
                  onClick={onClickRecord}
                >
                  <video className="recorded" src={recordedVideo} autoPlay />
                </ButtonBase>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

function Header({ label }: { label: string }) {
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
            {label}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
