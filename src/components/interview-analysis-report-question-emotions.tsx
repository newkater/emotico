import { secondsToTime } from "@/lib/utils";
import { View, Text } from "@react-pdf/renderer";
import { FC } from "react";

interface IProps {
  emotion: EmotionResult;
}

export const QuestionEmotions: FC<IProps> = ({ emotion }) => {
  return (
    <View>
      {emotion.emotion} {secondsToTime(emotion.exact_time)} -{" "}
      {secondsToTime(emotion.exact_time + emotion.duration)}
    </View>
  );
};
