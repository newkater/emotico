import { FC } from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";
import { ReportItem } from "./interview-analysis-report-item";
import { secondsToTime } from "@/lib/utils";

interface IProps {
  question: QuestionResult;
  index: number;
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 5,
  },
  item_row: {
    flexDirection: "row",
    fontSize: 14,
    textAlign: "left",
    fontFamily: "Times-Roman",
    fontWeight: "normal",
  },
  item_column: {
    flexDirection: "column",
    paddingVertical: 5,
  },
  item_title: {
    fontSize: 14,
    textAlign: "left",
    fontFamily: "Times-Bold",
  },
  title: {
    marginTop: 5,
  },
  item_text: {
    fontSize: 14,
    textAlign: "left",
    fontFamily: "Times-Roman",
    fontWeight: "normal",
  },
  questions: {
    paddingLeft: 15,
  },
});

const emotionResult = (emotion: EmotionResult) => {
  return (
    <View style={styles.item_row}>
      <Text>{" - "}</Text>
      <Text>{emotion.emotion}{" "}</Text>
      <Text>{secondsToTime(emotion.exact_time)}{" "}</Text>
      <Text>{" -"}</Text>
      <Text>{secondsToTime(emotion.exact_time + emotion.duration)}{";"}</Text>
    </View>
  );
};

export const ReportQuestion: FC<IProps> = ({ question, index }) => {
  const emotions = question.emotion_results ?? [];

  return (
    <View style={styles.item}>
      <View style={styles.title}>
        <ReportItem
          title={`Question ${index}.`}
          text={`Score: ${question.score}`}
        />
      </View>
      <View style={styles.questions}>
        <ReportItem title="Question:" text={question.question} />
        <View style={styles.item_column}>
          <Text style={styles.item_title}>Emotions:</Text>
          {emotions.map(emotionResult)}
        </View>    
        <ReportItem title="Feedback:" text={question.evaluation} column />
      </View>
    </View>
  );
};
