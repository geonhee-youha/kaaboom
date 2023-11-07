import { CSSProperties } from "react";
import { OnProgressProps } from "react-player/base";
import ReactPlayer, { Config } from "react-player/lazy";

export default function Video({
  videoRef,
  playing,
  muted,
  url,
  onDuration,
  onProgress,
  onEnded,
  config,
  playsinline,
  onBuffer,
  onBufferEnd,
  onReady,
  style,
}: {
  videoRef: any;
  playing: boolean;
  muted: boolean;
  url: string;
  onDuration?: ((duration: number) => void) | undefined;
  onProgress?: ((state: OnProgressProps) => void) | undefined;
  onEnded?: (() => void) | undefined;
  config?: Config | undefined;
  playsinline?: boolean | undefined;
  onBuffer?: (() => void) | undefined;
  onBufferEnd?: (() => void) | undefined;
  onReady?: ((player: ReactPlayer) => void) | undefined;
  style?: CSSProperties | undefined;
}) {
  return (
    <ReactPlayer
      playsinline={playsinline}
      ref={videoRef}
      playing={playing}
      muted={muted}
      url={url}
      onDuration={onDuration}
      onProgress={onProgress}
      onEnded={onEnded}
      config={config}
      progressInterval={500}
      onBuffer={onBuffer}
      onBufferEnd={onBufferEnd}
      onReady={onReady}
      style={style}
    />
  );
}
