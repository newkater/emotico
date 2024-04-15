"use client";

import { useRef, useState } from "react";
import { VideoPlayBack } from "./video-player";
import { VideoPreview } from "./video-preview";
import { Title } from "./title";
import {
  HiOutlineVideoCamera,
  HiOutlineVideoCameraSlash,
} from "react-icons/hi2";
import { BsRecordCircle, BsStopCircle } from "react-icons/bs";
import { ImSpinner5 } from "react-icons/im";
import { PiFileVideo } from "react-icons/pi";

export const VideoRecorder: React.FC = () => {
  const [recordingStatus, setRecordingStatus] = useState("idle");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const mediaChunks = useRef<Blob[]>([]);
  const [videoChunks, setVideoChunks] = useState<Blob[]>([]);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const mimeType = "video/webm";
  const playerWidth = 1024

  const mediaPreview = useRef<HTMLVideoElement>(null);

  const videoConstraints = {
    audio: true,
    video: true,
  };

  const connect = async () => {
    if ("MediaRecorder" in window) {
      const videoStream = await navigator.mediaDevices.getUserMedia(
        videoConstraints
      );
      setRecordedVideo(null);
      mediaChunks.current = [];
      setVideoChunks([]);
      setStream(videoStream);
    }
  };

  const disconnect = () => {
    setRecordedVideo(null);
    mediaChunks.current = [];
    setVideoChunks([]);
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

  const stopRecording = () => {
    if (mediaRecorder.current) {
      setRecordingStatus("stopping");
      mediaRecorder.current.stop();
      mediaChunks.current = [];

      mediaRecorder.current.onstop = () => {
        const videoBlob = new Blob(mediaChunks.current, { type: mimeType });
        const videoUrl = URL.createObjectURL(videoBlob);
        setRecordingStatus("stopped");
        setRecordedVideo(videoUrl);
        setVideoChunks([]);
      };
    }
  };

  const Control = (status: string) => {
    switch (status) {
      case "idle":
      case "stopped":
        return (
          <>
            <BsRecordCircle
              size={40}
              className="text-primary-dark hover:cursor-pointer"
              onClick={startRecording}
            />
            <span className="text-lg ml-3">Start recording</span>
          </>
        );
      case "recording":
        return (
          <>
            <BsStopCircle
              size={40}
              className="text-primary-dark hover:cursor-pointer"
              onClick={stopRecording}
            />
            <span className="text-lg ml-3">Stop recording</span>
          </>
        );
      case "stopping":
        return (
          <>
            <ImSpinner5 size={40} className="text-primary-dark animate-spin" />
            <span className="text-lg ml-3">Stopping</span>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex gap-10 flex-col">
      <div>
        <Title className="py-2 mt-2">
          <h3 className="text-2xl font-medium">Video Recorder</h3>
        </Title>
        <div className="my-2 flex items-center">
          {stream ? (
            <>
              <HiOutlineVideoCameraSlash
                size={40}
                className="text-primary-dark hover:cursor-pointer"
                onClick={disconnect}
              />
              <span className="text-lg m-3">Disconnect camera</span>
              {Control(recordingStatus)}
            </>
          ) : (
            <>
              <HiOutlineVideoCamera
                size={50}
                className="text-primary-dark hover:cursor-pointer"
                onClick={async () => await connect()}
              />
              <span className="text-lg ml-3">Connect camera</span>
            </>
          )}
        </div>
        <VideoPreview stream={stream} width={playerWidth}/>
      </div>
      {recordedVideo && (
        <div>
          <Title className="py-2 mt-2">
            <h3 className="text-2xl font-medium">Video Player</h3>
          </Title>

          <>
            <div className="my-2">           
              <a className="text-primary-dark text-lg flex items-center" href={recordedVideo}><PiFileVideo size={50} /><span>Download video</span></a>
            </div>
            <VideoPlayBack video={recordedVideo} width={playerWidth}/>
          </>
        </div>
      )}
    </div>
  );
};
