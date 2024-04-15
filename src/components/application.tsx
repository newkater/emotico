"use client";

import { FC, useState } from "react";
import { ApplicationStart } from "./application-start";
import { ApplicationQuestion } from "./application-question";
import { ApplicationEnd } from "./application-end";
import { Button } from "./ui/button";
import { notFound, useRouter } from "next/navigation";
import { useVideoRecorder } from "@/hooks/media-recorder";
import { VideoPreview } from "./video-preview";
import { BsRecordCircle, BsStopCircle } from "react-icons/bs";
import { getContainerClient, uploadFileFromBuffer } from "@/lib/storage";
import { fileContainers } from "@/constants";
import { generateVideoFileName } from "@/lib/utils";
import { addVideo } from "@/actions/video";
import { ApplicationAnswer } from "./application-answer";
import { ApplicationSaving } from "./application-saving";
import { ApplicationSavingResults } from "./application-saving-results";
import { createInterviewResult } from "@/actions/interview";
import webmToMp4 from "webm-to-mp4"

interface IProps {
  interview: PositionInterview;
  questions: Question[];
  connectionString: string;
}

export type VideoAnswer = {
  question: Question;
  video: Blob;
  url: string;
};

export const Application: FC<IProps> = ({
  interview,
  questions,
  connectionString,
}) => {
  if (questions.length === 0) {
    notFound();
  }

  const [page, setPage] = useState<
    "start" | "question" | "answer" | "end" | "result"
  >("start");

  const [questionIndex, setQuestionIndex] = useState<number>(0);

  const [saving, setSaving] = useState(false);

  const [agreementAccepted, setAgreementAccepted] = useState(false);

  const [answers, setAnswers] = useState<VideoAnswer[]>([]);

  const playerWidth = 512;

  const mimeType = "video/mp4";

  const router = useRouter()

  const {
    connect,
    disconnect,
    startRecording,
    stopRecording,
    recordingStatus,
    stream,
    recordedVideo,
    recordedVideoUrl,
  } = useVideoRecorder();

  const nextPageLabel = () => {
    switch (page) {
      case "start":
        return "Proceed with the interview";
      case "question":
        return "Ready to answer";
      case "answer":
        return questionIndex === questions.length - 1
          ? "Finalise the answers"
          : "Proceed with the next question";
      case "end":
        return "Evaluate questions and complete the interview";
      default:
        return "";
    }
  };

  const uploadVideo = async (video: Blob, question: Question) => {
    try {
      const buffer = await video.arrayBuffer().then(buf => webmToMp4(Buffer.from(buf)));

      // const buffer = await video.arrayBuffer();
      const client = await getContainerClient(
        connectionString,
        fileContainers.video
      );
      const { value: path } = await uploadFileFromBuffer(
        Buffer.from(buffer),
        client,
        `${question.public_id}_${generateVideoFileName()}`,
        mimeType
      );

      if (path) {
        console.log("video uploaded: ", path);
        await addVideo(interview.public_id, question.public_id, path);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const nextStepDisabled = () => {
    if (!agreementAccepted) {
      return true;
    }
    if (page === "start" && stream === null) {
      return true;
    }
    return false;
  };

  const nextStep = () => {
    switch (page) {
      case "start":
        setPage("question");
        break;
      case "question":
        startRecording();
        setPage("answer");
        break;
      case "answer":
        stopRecording((blob, url) => {
          setAnswers([
            ...answers,
            {
              question: questions[questionIndex],
              video: blob,
              url,
            },
          ]);
          setSaving(true);

          uploadVideo(blob, questions[questionIndex]).then(() =>
            setSaving(false)
          );
        });
        if (questionIndex === questions.length - 1) {
          setQuestionIndex(0);
          setPage("end");
        } else {
          const nextIndex = questionIndex + 1;
          setQuestionIndex(nextIndex);
          setPage("question");
        }
        break;
      case "end":
        setPage("result");
        createInterviewResult(interview.public_id).then(() =>
          router.push(`/interviews/${interview.public_id}/analysis`)
        );
      default:
        break;
    }
  };

  return (
    <>
      {saving && page === "end" ? (
        <ApplicationSaving />
      ) : page === "result" ? (
        <ApplicationSavingResults />
      ) : (
        <div>
          {page === "start" ? (
            <ApplicationStart
              questions={questions}
              stream={stream}
              connect={connect}
              disconnect={disconnect}
              accepted={agreementAccepted}
              setAccepted={setAgreementAccepted}
            />
          ) : page === "question" ? (
            <ApplicationQuestion
              question={questions[questionIndex]}
              total={questions.length}
              index={questionIndex + 1}
              onTimeLimit={nextStep}
            />
          ) : page === "answer" ? (
            <ApplicationAnswer
              question={questions[questionIndex]}
              total={questions.length}
              index={questionIndex + 1}
              onTimeLimit={nextStep}
            />
          ) : page === "end" ? (
            <ApplicationEnd stream={stream} disconnect={disconnect} />
          ) : null}
          <VideoPreview stream={stream} width={playerWidth} />
          {recordingStatus === "recording" && (
            <div className="flex items-center mt-2">
              <BsRecordCircle
                size={32}
                className="text-primary-dark animate-pulse"
              />
              <span className="ml-2 text-lg text-primary-dark">
                Recording is in progress
              </span>
            </div>
          )}
          {(recordingStatus === "stopping" ||
            recordingStatus === "stopped") && (
            <div className="flex items-center mt-2">
              <BsStopCircle size={32} className="text-primary-dark" />
              <span className="ml-2 text-lg text-primary-dark">
                Recording is {recordingStatus}
              </span>
            </div>
          )}
          <div className="flex justify-center py-3">
            <Button
              disabled={nextStepDisabled()}
              onClick={nextStep}
              variant="link"
              size="xl"
            >
              {nextPageLabel()}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
