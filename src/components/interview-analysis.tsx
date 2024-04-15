import React, { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { InterviewAnalysisDetails } from "./interview-analysis-details";
import { InterviewAnalysisInfo } from "./interview-analysis-info";
import { InterviewAnalysisScore } from "./interview-analysis-score";
import { InterviewAnalysisReport } from "./interview-analysis-report";

interface IProps {
  interview: PositionInterview;
  position: Position
}

export const InterviewAnalysis: FC<IProps> = ({ interview, position }) => {
  return (
    <section className="bg-fill-medium">
      <div>
        <Tabs defaultValue="information" className="flex">
          <TabsList>
            <TabsTrigger value="information">Basic Information</TabsTrigger>
            <TabsTrigger value="score">Score</TabsTrigger>
            <TabsTrigger value="details">Interview Details</TabsTrigger>
            <TabsTrigger value="report">Report</TabsTrigger>            
          </TabsList>
          <TabsContent value="information" className="w-full">
            <InterviewAnalysisInfo interview={interview} position={position} />
          </TabsContent>
          <TabsContent value="score" className="w-full">
            <InterviewAnalysisScore interview={interview} />
          </TabsContent>
          <TabsContent value="details" className="w-full">
            <InterviewAnalysisDetails interview={interview} />
          </TabsContent>
          <TabsContent value="report" className="w-full">
            <InterviewAnalysisReport interview={interview} position={position}/>
          </TabsContent>          
        </Tabs>
      </div>
    </section>
  );
};
