import { FC } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

interface IProps {
  title: string;
  text: string;
  column?: boolean
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    paddingVertical: 5,
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
  item_text: {
    fontSize: 14,
    textAlign: "left",
    fontFamily: "Times-Roman",
    fontWeight: "normal",
  },
});

export const ReportItem: FC<IProps> = ({ title, text, column }) => {
  return (
    <View style={column ? styles.item_column : styles.item}>
      <Text style={styles.item_title}>{title}{" "}</Text>
      <Text style={styles.item_text}>{text}</Text>
    </View>
  );
};
