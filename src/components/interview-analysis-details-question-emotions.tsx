import { FC, RefObject } from "react";
import { Button } from "./ui/button";
import { secondsToTime } from "@/lib/utils";

interface IProps {
  emotions: EmotionResult[];
  videoRef: RefObject<HTMLVideoElement>;
  className?: string;
}

export const QuestionDetailsEmotions: FC<IProps> = ({
  emotions,
  videoRef,
  className = "",
}) => {
  const goTo = (time: number) => {
    if (videoRef !== null && videoRef.current !== null) {
      videoRef.current.currentTime = time;
    }
  };
  return (
    <div className={className}>
      {emotions &&
        emotions.map((emotion, index) => (
          <Button
            className="m-1"
            variant="outline"
            size="lg"
            onClick={() => goTo(emotion.exact_time)}
            key={emotion.emotion + index}
          >
            {emotion.emotion} {secondsToTime(emotion.exact_time)} - {secondsToTime(emotion.exact_time + emotion.duration)}
          </Button>
        ))}
    </div>
  );
};
