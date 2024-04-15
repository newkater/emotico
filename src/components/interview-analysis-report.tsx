"use client";

import { FC } from "react";
import { InterviewAnalysisReportPdf } from "./interview-analysis-report-pdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "./ui/button";

interface IProps {
  interview: PositionInterview;
  position: Position;
}

export const InterviewAnalysisReport: FC<IProps> = ({
  interview,
  position,
}) => {
  return (
    <div className="p-6">
      <div className="mb-2">
        <Button variant="secondary" size="lg">
          <PDFDownloadLink
            document={
              <InterviewAnalysisReportPdf
                interview={interview}
                position={position}
              />
            }
            fileName="report.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download report"
            }
          </PDFDownloadLink>
        </Button>
      </div>
    </div>
  );
};
