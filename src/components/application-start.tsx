import React, { Dispatch, FC, SetStateAction } from "react";
import {
  HiOutlineVideoCamera,
  HiOutlineVideoCameraSlash,
} from "react-icons/hi2";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
interface IProps {
  questions: Question[];
  stream: MediaStream | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  accepted: boolean;
  setAccepted: Dispatch<SetStateAction<boolean>>;
}

export const ApplicationStart: FC<IProps> = ({
  questions,
  accepted,
  setAccepted,
  stream,
  connect,
  disconnect,
}) => {
  return (
    <div className="text-lg">
      <Card className="p-10">
        <p className="py-1">
          This interview consists of {questions.length} questions.
        </p>
        <p className="py-1">
          You will be given limited time to read and to answer each question.
        </p>
        <p className="py-1">
          You are expected to record yourself throughout the interview. Make
          sure that your face is visible all the time during the recording.{" "}
        </p>
        <p className="py-1">
          After the interview you need to wait until your answer is recorded
          into the system.
        </p>
      </Card>
      <div className="py-5">
        <Checkbox
          checked={accepted}
          onCheckedChange={(checked) => setAccepted(!!checked)}
        />
        <Label className="mx-2">I agree and ready to proceed</Label>
      </div>
      {stream ? (
        <div className="flex items-center py-2">
          <Button variant="ghost" onClick={disconnect}>
            <HiOutlineVideoCameraSlash
              size={32}
              className="text-primary-dark"
            />{" "}
            <span className="text-lg m-3">Disconnect camera</span>
          </Button>
        </div>
      ) : (
        accepted && (
          <div className="flex items-center py-2">
            <Button variant="ghost" onClick={async () => await connect()}>
              <HiOutlineVideoCamera
                size={32}
                className="text-primary-dark hover:cursor-pointer"
              />
              <span className="text-lg ml-3">Connect camera</span>
            </Button>
          </div>
        )
      )}
    </div>
  );
};
