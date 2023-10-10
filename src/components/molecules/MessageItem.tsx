import { Box, ButtonBase, Typography } from "@mui/material";
import { MessageProps } from "../../data/message";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { theme } from "../../themes/theme";
import { OnProgressProps } from "react-player/base";
import Icon from "../atoms/Icon";
import Visual from "../atoms/Visual";
import { artists } from "../../data/artist";
import _ from "lodash";
import youhaGrey from "../../constants/youhaGrey";
import { useInView } from "react-intersection-observer";
import Typo from "../atoms/Typo";
import Link from "next/link";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export default function MessageItem({
  item,
  index,
  focusedIndex,
  setFocusedIndex,
}: {
  item: MessageProps;
  index: number;
  focusedIndex: number;
  setFocusedIndex: Dispatch<SetStateAction<number>>;
}) {
  const { ref, inView } = useInView();
  const [isWindow, setIsWindow] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(true);
  const [controlls, setControlls] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  useEffect(() => {
    setIsWindow(true);
  }, []);
  const onMouseOver = () => {
    setFocusedIndex(index);
    setControlls(true);
  };
  const onMouseOut = () => {
    setControlls(false);
    setMuted(true);
  };
  const onDuration = (duration: number) => {
    setDuration(Number(duration.toFixed(0)));
  };
  const onProgress = (state: OnProgressProps) => {
    setProgress(Number(state.playedSeconds.toFixed(0)));
  };
  const onClickPlay = () => {
    setPlaying(!playing);
  };
  const min = String(parseInt(" " + (duration % 3600) / 60)).padStart(2, "0");
  const sec = String(duration % 60).padStart(2, "0");
  const time = min + ":" + sec;
  const playedMin = String(parseInt(" " + (progress % 3600) / 60)).padStart(
    2,
    "0"
  );
  const playedSec = String(progress % 60).padStart(2, "0");
  const playedTime = playedMin + ":" + playedSec;
  const artist =
    artists[
      _.findIndex(artists, (el) => {
        return el.name === item.artist.name;
      })
    ];
  useEffect(() => {
    const focused = focusedIndex === index;
    setPlaying(focused);
  }, [focusedIndex]);
  useEffect(() => {
    if (!inView) {
      setPlaying(false);
      setFocusedIndex(-1);
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
        "& > div:first-child": {
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
      <ReactPlayer
        playing={playing}
        muted={true}
        url={`${item.src}`}
        onDuration={onDuration}
        onProgress={onProgress}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          background: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0))",
          p: theme.spacing(1),
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
          zIndex: 999,
          background: "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))",
          p: theme.spacing(4, 1, 2, 1),
          transition: `all 0.35s ease`,
        }}
      >
        <Link href={`/artist/${artist.id}`} passHref>
          <ButtonBase
            disableRipple
            sx={{
              display: "flex",
              alignItems: "center",
              pb: 2,
              transform: controlls ? "translateY(0)" : "translateY(40px)",
              transition: `all 0.35s ease`,
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
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
                ml: 1,
              }}
            >
              <Typo
                lines={1}
                sx={{
                  fontSize: 14,
                  lineHeight: "20px",
                  fontWeight: "700",
                  whiteSpace: "nowrap",
                }}
              >
                {artist.name}
              </Typo>
              <Typo
                lines={1}
                sx={{
                  fontSize: 12,
                  lineHeight: "16px",
                  whiteSpace: "nowrap",
                  color: youhaGrey[200]
                }}
              >
                {artist.group?.name ?? "SOLO"}
              </Typo>
            </Box>
          </ButtonBase>
        </Link>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            transform: controlls ? "translateY(0)" : "translateY(40px)",
            transition: `all 0.35s ease`,
            height: 20,
            overflow: 'visible'
          }}
        >
          <Icon
            name={playing ? "pause" : "play"}
            prefix="fas"
            size={20}
            onClick={onClickPlay}
            sx={{
              mr: 1,
            }}
          />
          <Typography
            sx={{
              fontSize: 12,
              lineHeight: "16px",
              transition: `all 0.35s ease`,
            }}
          >
            {playedTime} / {time}
          </Typography>
          <Icon
            name={!muted ? "volume" : "volume-xmark"}
            prefix="far"
            size={20}
            onClick={() => {
              setMuted(!muted);
            }}
            sx={{
              ml: "auto",
            }}
          />
        </Box>
      </Box>
    </ButtonBase>
  );
}
