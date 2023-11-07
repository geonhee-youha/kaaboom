import React, { useEffect, useState } from "react";
import { Box, SxProps } from "@mui/material";
import { useInView } from "react-intersection-observer";
import ReactPlayer from "react-player";
type Props = {
  src: string;
  boxSx?: SxProps;
  sx?: SxProps;
  absolute?: boolean;
  coverBgColor?: string;
  onClick?: () => void;
  video?: boolean;
  children?: React.ReactNode;
  threshold: number;
  forceShow?: boolean;
  top?: boolean;
};
export default function Visual({
  src,
  boxSx,
  sx,
  absolute,
  coverBgColor,
  onClick,
  video,
  children,
  threshold,
  forceShow,
  top,
}: Props) {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const { ref, inView, entry } = useInView({
    threshold: threshold,
  });
  useEffect(() => {
    if (inView && loaded) {
      setShow(true);
    }
    if (forceShow && src) {
      setShow(true);
    }
    if (video) setPlaying(inView);
  }, [inView, loaded]);
  return (
    <Box
      ref={ref}
      sx={
        absolute
          ? {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              "& video": {
                display: video ? "block" : "none",
                opacity: show ? 1 : 0,
                objectFit: "cover",
                zIndex: -1,
                minheight: "100%",
              },
              "&.video::after": {
                position: "absolute",
                content: '""',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.6)",
                zIndex: 1,
              },
            }
          : {
              position: "relative",
              ...boxSx,
              "& video": {
                display: video ? "block" : "none",
                opacity: show ? 1 : 0,
                objectFit: "cover",
                zIndex: -1,
                minheight: "100%",
              },
              "&.video::after": {
                position: "absolute",
                content: '""',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.6)",
                zIndex: 1,
              },
            }
      }
      onClick={onClick}
      className={video ? "video" : ""}
    >
      <Box
        sx={
          absolute
            ? {
                width: "100%",
                height: "100%",
                ...sx,
                transition: "none !important",
              }
            : { ...sx }
        }
        className="ImageContainer"
      >
        {video && (
          <ReactPlayer
            playsinline
            url={src}
            muted
            loop
            playing={playing}
            width="100%"
            height="100%"
            config={{
              file: {
                attributes: {
                  poster: "/logos/share.png",
                },
              },
            }}
            onReady={() => {
              setLoaded(true);
            }}
          />
        )}
        <img
          src={src}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: video ? "none" : "initial",
            opacity: show ? 1 : 0,
            transition: "all 0.5s ease",
            objectPosition: top ? "top center" : "center center !important",
          }}
          onLoad={() => {
            setLoaded(true);
          }}
        />
        {coverBgColor && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: coverBgColor,
              display: video ? "none" : "initial",
            }}
          >
            {children}
          </Box>
        )}
      </Box>
    </Box>
  );
}
Visual.defaultProps = {
  threshold: 0.1,
};
