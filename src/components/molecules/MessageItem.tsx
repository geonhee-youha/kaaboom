import { Box, ButtonBase, Slider, Typography, alpha } from "@mui/material";
import { MessageProps } from "../../data/message";
import dynamic from "next/dynamic";
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { theme } from "../../themes/theme";
import { OnProgressProps } from "react-player/base";
import Visual from "../atoms/Visual";
import { artists } from "../../data/artist";
import _ from "lodash";
import youhaGrey from "../../constants/youhaGrey";
import { useInView } from "react-intersection-observer";
import Typo from "../atoms/Typo";
import IconButton from "../atoms/IconButton";
import { useRouter } from "next/router";
import { formatTimer } from "../../utils";

const Video = dynamic(() => import("../atoms/Video"), { ssr: false });

export default function MessageItem({
  type,
  item,
  index,
  selectedIndex,
  setSelectedIndex,
  playsinline = true
}: {
  type?: string;
  item: MessageProps;
  index: number;
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  playsinline?: boolean
}) {
  const router = useRouter();
  const { ref, inView } = useInView();
  const [isWindow, setIsWindow] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(true);
  const [controlls, setControlls] = useState<boolean>(false);
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
  const onMouseOver = () => {
    setSelectedIndex(index);
    setControlls(true);
  };
  const onMouseOut = () => {
    setControlls(false);
  };
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
  useEffect(() => {
    const focused = selectedIndex === index;
    setPlaying(focused);
  }, [selectedIndex]);
  useEffect(() => {
    if (!inView) {
      setPlaying(false);
      setSelectedIndex(-1);
    }
  }, [inView]);
  return (
    <ButtonBase
      ref={ref}
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        aspectRatio: `9 / 16`,
        borderRadius: 1,
        overflow: "hidden",
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
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClickPlay}
    >
      <Video
        videoRef={videoRef}
        playing={playing}
        playsinline={playsinline}
        muted={muted}
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
          background: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0))",
          p: theme.spacing(2),
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
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 98,
          background: "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))",
          p: theme.spacing(4, 0.5, 0.5, 0.5),
          transition: `all 0.35s ease`,
        }}
      >
        <Box
          sx={{
            p: theme.spacing(1.5),
          }}
        >
          <ButtonBase
            disableRipple
            sx={{
              display: "flex",
              alignItems: "center",
              transform:
                controlls || type === "chat"
                  ? "translateY(0)"
                  : "translateY(40px)",
              transition: `all 0.35s ease`,
            }}
            onClick={onClickArtist}
          >
            <Visual
              sx={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                overflow: "hidden",
                border: `1px solid ${youhaGrey[200]}`,
              }}
              src={artist.thumbnail}
            />
            <Box
              sx={{
                flex: 1,
                ml: 1,
              }}
            >
              <Typo
                lines={1}
                sx={{
                  fontSize: 14,
                  lineHeight: "20px",
                  fontWeight: "700",
                  wordBreak: "break-all",
                }}
              >
                {artist.name}
              </Typo>
              <Typo
                lines={1}
                sx={{
                  fontSize: 12,
                  lineHeight: "16px",
                  wordBreak: "break-all",
                  color: youhaGrey[200],
                }}
              >
                {artist.group?.name ?? "SOLO"}
              </Typo>
            </Box>
          </ButtonBase>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            transform: controlls || type === "chat" ? "translateY(0)" : "translateY(40px)",
            transition: `all 0.35s ease`,
            overflow: "visible",
          }}
        >
          <IconButton
            name={playing ? "pause" : "play"}
            prefix="fas"
            size={20}
            onClick={onClickPlay}
            sx={{
              width: 40,
              height: 40,
            }}
          />
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                lineHeight: "16px",
                transition: `all 0.35s ease`,
                wordBreak: "break-all",
                display: type === "chat" ? "none" : "flex",
              }}
            >
              {playedTime} / {time}
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                lineHeight: "16px",
                transition: `all 0.35s ease`,
                wordBreak: "break-all",
                display: type === "chat" ? "flex" : "none",
              }}
            >
              {playedTime}
            </Typography>
            <Box
              sx={{
                position: "relative",
                p: theme.spacing(0, 3),
                flex: 1,
                display: type === "chat" ? "flex" : "none",
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
                    width: `calc(${(seconds.loadedSeconds / duration) * 100
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
                display: type === "chat" ? "flex" : "none",
              }}
            >
              {time}
            </Typography>
          </Box>
          <IconButton
            name={!muted ? "volume" : "volume-xmark"}
            prefix="far"
            size={20}
            onClick={onClickMute}
            sx={{
              width: 40,
              height: 40,
            }}
          />
        </Box>
      </Box>
    </ButtonBase>
  );
}
