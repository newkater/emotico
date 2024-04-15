import { useEffect, useRef } from "react";

interface IProps {
  stream: MediaStream | null;
  width: number
}

export const VideoPreview: React.FC<IProps> = ({ stream, width }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  if (!stream) {
    return null;
  }
  return <video ref={videoRef} width={width} autoPlay muted />;
};
