import React, { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { PositionDetailsInfo } from "./position-details-info";
import { PositionDetailsQuestions } from "./position-details-questions";
import { PositionDetailsApplicants } from "./position-details-applicants";

interface IProps {
  position: Position;
}

export const PositionDetails: FC<IProps> = ({ position }) => {
  return (
    <section className="bg-fill-medium">
      <div>
        <Tabs defaultValue="information" className="flex">
          <TabsList>
            <TabsTrigger value="information">Basic Information</TabsTrigger>
            <TabsTrigger value="questions">Interview Questions</TabsTrigger>
            <TabsTrigger value="applicants">Position Applicants</TabsTrigger>
          </TabsList>
          <TabsContent value="information" className="w-full">
            <PositionDetailsInfo position={position}/>
          </TabsContent>
          <TabsContent value="questions" className="w-full">
            <PositionDetailsQuestions position={position}/>
          </TabsContent>
          <TabsContent value="applicants" className="w-full">
            <PositionDetailsApplicants position={position}/>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
