import {
  Box,
  ButtonBase,
  Slider,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import dynamic from "next/dynamic";
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { theme } from "../../../themes/theme";
import { OnProgressProps } from "react-player/base";
import Visual from "../../atoms/Visual";
import { artists } from "../../../data/artist";
import _ from "lodash";
import youhaGrey from "../../../constants/youhaGrey";
import { useInView } from "react-intersection-observer";
import Typo from "../../atoms/Typo";
import IconButton from "../../atoms/IconButton";
import { useRouter } from "next/router";
import { formatTimer } from "../../../utils";
import youhaBlue from "../../../constants/youhaBlue";
import { MessageProps } from "../../../data/message";
import { atom, useRecoilState } from "recoil";

const Video = dynamic(() => import("../../atoms/Video"), { ssr: false });

export const fullscreenState = atom({
  key: "fullscreenState",
  default: {
    open: false,
  },
});

export default function VideoPlayer({ item }: { item: MessageProps }) {
  const router = useRouter();
  const [fullscreen, setFullscreen] = useRecoilState(fullscreenState);
  const open = fullscreen.open;
  const { ref, inView } = useInView();
  const [isWindow, setIsWindow] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(true);
  const [controlls, setControlls] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>(0);
  const videoRef = useRef<any>(null);
  const [seconds, setSeconds] = useState<{
    playedSeconds: number;
    loadedSeconds: number;
  }>({ playedSeconds: 0, loadedSeconds: 0 });
  const [seeking, setSeeking] = useState<boolean>(false);
  const onSliderChange = () => {
    setSeeking(true);
  };
  const onSliderChangeCommitted = (e: any, value: any) => {
    setSeeking(false);
    if (videoRef) videoRef.current?.seekTo(value);
    setSeconds({
      ...seconds,
      playedSeconds: value,
    });
  };
  const onEnded = () => {
    setPlaying(false);
  };
  useEffect(() => {
    setIsWindow(true);
  }, []);
  //   const onMouseOver = () => {
  //     setSelectedIndex(index);
  //     setControlls(true);
  //   };
  //   const onMouseOut = () => {
  //     setControlls(false);
  //   };
  const onDuration = (duration: number) => {
    setDuration(Number(duration.toFixed(0)));
  };
  const onProgress = (state: OnProgressProps) => {
    if (seeking) return null;
    setSeconds({
      playedSeconds: state.playedSeconds,
      loadedSeconds: state.loadedSeconds,
    });
  };
  const onClickArtist = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    router.push(`/detail/artist/${artist.id}`);
  };
  const onClickPlay = () => {
    setPlaying(!playing);
  };
  const onClickMute = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    setMuted(!muted);
  };
  const min = String(parseInt(" " + (duration % 3600) / 60)).padStart(2, "0");
  const sec = String(duration % 60).padStart(2, "0");
  const time = min + ":" + sec;
  const playedMin = String(
    parseInt(" " + (Number(seconds.playedSeconds.toFixed(0)) % 3600) / 60)
  ).padStart(2, "0");
  const playedSec = String(
    Number(seconds.playedSeconds.toFixed(0)) % 60
  ).padStart(2, "0");
  const playedTime = playedMin + ":" + playedSec;
  const artist =
    artists[
      _.findIndex(artists, (el) => {
        return el.name === item.artist.name;
      })
    ];
  const onClickFullscreen = () => {
    setFullscreen({ open: !open });
  };
  const onClose = () => {
    setFullscreen({ open: false });
  };
  useEffect(() => {
    if (!inView) {
      setPlaying(false);
    }
  }, [inView]);
  return (
    <>
      <Box
        sx={
          open
            ? {
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 999,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }
            : {
                width: "100%",
                height: "100%",
              }
        }
      >
        {open && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backdropFilter: `blur(4px)`,
              backgroundColor: alpha(youhaGrey[900], 0.7),
            }}
            onClick={onClose}
          />
        )}
        <Box
          sx={
            open
              ? {
                  position: `relative`,
                  overflowY: `auto`,
                  maxHeight: `calc(100% - 64px)`,
                  maxWidth: `600px`,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  "@media(min-width: 960px)": {
                    m: theme.spacing(3),
                  },
                }
              : {
                  width: "100%",
                  height: "100%",
                }
          }
        >
          <ButtonBase
            ref={ref}
            sx={{
              flex: open ? 1 : "initial",
              position: "relative",
              width: "100%",
              height: "100%",
              aspectRatio: `9 / 16`,
              overflow: "hidden",
              borderRadius: open ? 0 : 1,
              "@media(min-width: 960px)": {
                borderRadius: 1,
              },
              "& > div:nth-of-type(1)": {
                width: "100% !important",
                height: "100% !important",
              },
              "& video": {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                objectFit: "cover",
              },
              "&:hover .time": {
                opacity: 0,
              },
            }}
            disableRipple
            // onMouseOver={onMouseOver}
            // onMouseOut={onMouseOut}
            onClick={onClickPlay}
          >
            <Video
              videoRef={videoRef}
              playing={playing}
              muted={open || muted}
              url={`${item.src}`}
              onDuration={onDuration}
              onProgress={onProgress}
              onEnded={onEnded}
              config={{
                file: {
                  attributes: {
                    poster: item.thumbnail,
                  },
                },
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 98,
                background:
                  "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0))",
                p: theme.spacing(2),
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  lineHeight: "16px",
                  transition: `all 0.35s ease`,
                }}
                className="time"
              >
                {time}
              </Typography>
              <IconButton
                name={open ? "compress" : "expand"}
                size={open ? 24 : 20}
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                }}
                onClick={onClickFullscreen}
              />
            </Box>
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 98,
                background:
                  "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))",
                p: theme.spacing(4, 0.5, open ? 1 : 0.5, 0.5),
                transition: `all 0.35s ease`,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  transition: `all 0.35s ease`,
                  overflow: "visible",
                }}
              >
                <IconButton
                  name={playing ? "pause" : "play"}
                  prefix="fas"
                  size={open ? 24 : 20}
                  onClick={onClickPlay}
                  sx={{
                    width: 40,
                    height: 40,
                  }}
                />
                <Stack
                  direction={"row"}
                  sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    p: theme.spacing(0, open ? 1 : 0),
                  }}
                >
                  {/* <Typography
                      sx={{
                        fontSize: 12,
                        lineHeight: "16px",
                        transition: `all 0.35s ease`,
                        wordBreak: "break-all",
                        display:"flex",
                      }}
                    >
                      {playedTime} / {time}
                    </Typography> */}
                  <Typography
                    sx={{
                      fontSize: 12,
                      lineHeight: "16px",
                      transition: `all 0.35s ease`,
                      wordBreak: "break-all",
                    }}
                  >
                    {playedTime}
                  </Typography>
                  <Box
                    sx={{
                      position: "relative",
                      p: theme.spacing(0, open ? 3 : 2.5),
                      flex: 1,
                      display: "flex",
                      transition: `all 0.35s ease`,
                    }}
                  >
                    <Slider
                      key={`Slider-${seconds.playedSeconds}`}
                      defaultValue={seconds.playedSeconds}
                      max={duration}
                      aria-label="Default"
                      valueLabelDisplay="auto"
                      getAriaValueText={formatTimer}
                      valueLabelFormat={formatTimer}
                      onChange={onSliderChange}
                      onChangeCommitted={onSliderChangeCommitted}
                      // size="small"
                      sx={{
                        "&.MuiSlider-root": {
                          padding: "18px 0",
                        },
                        "& .MuiSlider-rail": {
                          opacity: "1 !important",
                          backgroundColor: alpha(youhaGrey[900], 0.2),
                          overflow: "hidden",
                          left: "-8px",
                          right: "-8px",
                          width: "auto",
                        },
                        "& .MuiSlider-track": {
                          left: "-8px !important",
                        },
                        "& .MuiSlider-rail::after": {
                          position: "absolute",
                          content: '""',
                          top: 0,
                          left: 0,
                          bottom: 0,
                          transition: "all 1s ease",
                          width: `calc(${
                            (seconds.loadedSeconds / duration) * 100
                          }% + 8px)`,
                          backgroundColor: "rgba(255,255,255,0.6)",
                        },
                      }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: 12,
                      lineHeight: "16px",
                      transition: `all 0.35s ease`,
                      wordBreak: "break-all",
                      display: "flex",
                    }}
                  >
                    {time}
                  </Typography>
                </Stack>
                <IconButton
                  name={!muted ? "volume" : "volume-xmark"}
                  prefix="far"
                  size={open ? 24 : 20}
                  onClick={onClickMute}
                  sx={{
                    width: 40,
                    height: 40,
                  }}
                />
              </Box>
            </Box>
          </ButtonBase>
        </Box>
      </Box>
    </>
  );
}
