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
}: {
  videoRef: any;
  playing: boolean;
  muted: boolean;
  url: string;
  onDuration?: ((duration: number) => void) | undefined;
  onProgress?: ((state: OnProgressProps) => void) | undefined;
  onEnded?: (() => void) | undefined;
  config?: Config | undefined;
}) {
  return (
    <ReactPlayer
      ref={videoRef}
      playing={playing}
      muted={muted}
      url={url}
      onDuration={onDuration}
      onProgress={onProgress}
      onEnded={onEnded}
      config={config}
      progressInterval={500}
      playsinline
    />
  );
}
