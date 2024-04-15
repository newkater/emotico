import { useRef, useState } from "react";

const videoConstraints = {
  audio: true,
  video: true,
};

const mimeType = "video/webm";

export const useVideoRecorder = () => {
  const [recordingStatus, setRecordingStatus] = useState<
    "idle" | "recording" | "stopping" | "stopped"
  >("idle");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const mediaChunks = useRef<Blob[]>([]);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordedVideo, setRecordedVideo] = useState<Blob | null>(null);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);

  const connect = async () => {
    if ("MediaRecorder" in window) {
      const videoStream = await navigator.mediaDevices.getUserMedia(
        videoConstraints
      );
      setRecordedVideo(null);
      mediaChunks.current = [];
      setStream(videoStream);
    }
  };

  const disconnect = () => {
    setRecordedVideo(null);
    mediaChunks.current = [];
    setStream(null);
  };

  const startRecording = async () => {
    if (stream) {
      mediaChunks.current = [];
      setRecordedVideo(null);
      setRecordingStatus("recording");
      mediaRecorder.current = new MediaRecorder(stream, { mimeType });
      mediaRecorder.current.start();
      mediaRecorder.current.ondataavailable = (event) => {
        if (typeof event.data === "undefined" || event.data.size === 0) {
          return;
        }
        mediaChunks.current.push(event.data);
      };
    }
  };

  const stopRecording = (onStop?: (blob: Blob, url: string) => void) => {
    if (mediaRecorder.current) {
      setRecordingStatus("stopping");
      mediaRecorder.current.stop();
      mediaChunks.current = [];

      mediaRecorder.current.onstop = () => {
        const videoBlob = new Blob(mediaChunks.current, { type: mimeType });
        setRecordedVideo(videoBlob);
        const videoUrl = URL.createObjectURL(videoBlob);
        setRecordedVideoUrl(videoUrl);
        setRecordingStatus("stopped");
        if (onStop) {
          onStop(videoBlob, videoUrl)
        }
      };
    }
  };

  return {
    connect,
    disconnect,
    startRecording,
    stopRecording,
    recordingStatus,
    stream,
    recordedVideo,
    recordedVideoUrl,
  };
};
