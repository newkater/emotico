"use client";

import { FC } from "react";
import {
  Text,
  Page,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { ReportHeader } from "./interview-analysis-report-header";
import { ReportItem } from "./interview-analysis-report-item";
import { ReportQuestion } from "./interview-analysis-report-question";
import { getScore } from "@/lib/utils";

interface IProps {
  interview: PositionInterview;
  position: Position;
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: "Times-Roman",
  },
  header: {
    marginBottom: 12,
  },
  heading: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Times-Bold",
    padding: 5,
    marginTop: 5,
  },
  title: {
    fontSize: 18,
    textAlign: "left",
    fontFamily: "Times-Roman",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Times-Roman",
    fontWeight: "light",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
});

export const InterviewAnalysisReportPdf: FC<IProps> = ({
  interview,
  position,
}) => {
  const date = new Date();
  const questions = interview.result?.questions ?? [];
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.title}>Interview report</Text>
          <Text style={styles.subtitle}>From {`${date.toLocaleString()}`}</Text>
        </View>
        <ReportHeader interview={interview} position={position} />
        <Text style={styles.heading}>Interview Results</Text>
        <ReportItem
          title="Final score"
          text={getScore(interview.result).toString()}
        />
        {questions.length === 0 ? (
          <Text>The results are not ready yet</Text>
        ) : (
          questions.map((question, index) => <ReportQuestion index={index + 1} question={question} key={index + 1}/>)
        )}
      </Page>
    </Document>
  );
};
