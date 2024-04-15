import { FC } from "react";
import {
  Text,
  Font,
  Page,
  View,
  Image,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { ReportItem } from "./interview-analysis-report-item";

interface IProps {
  interview: PositionInterview;
  position: Position
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 5,
  }
});


export const ReportHeader: FC<IProps> = ({ interview, position }) => {
  const date = new Date();
  return (
  <View style={styles.header}>
    <ReportItem title={"Company:"} text={position.company.name}/>
    <ReportItem title={"Position:"} text={position.name}/>
    <ReportItem title={"Job Description:"} text={position.description}/>
  </View>

  );
};


