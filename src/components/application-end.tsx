import { FC } from "react";
import { Title } from "./title";
import { Button } from "./ui/button";
import { HiOutlineVideoCameraSlash } from "react-icons/hi2";
import { Card } from "./ui/card";

interface IProps {
  stream: MediaStream | null;
  disconnect: () => void;
}

export const ApplicationEnd: FC<IProps> = ({ stream, disconnect }) => {
  return (
    <div className="mt-10">
      <Title className="text-xl flex items-center p-2">
        <h3>Thank you for applying</h3>
      </Title>
      <Card className="p-10 text-lg">
        <p className="py-1">
          You can disconnect the camera and proceed to get the interview result.
        </p>
      </Card>
      {stream && (
        <div className="flex items-center py-2">
          <Button variant="ghost" onClick={disconnect}>
            <HiOutlineVideoCameraSlash
              size={32}
              className="text-primary-dark"
            />
            <span className="text-lg m-3">Disconnect camera</span>
          </Button>
        </div>
      )}
    </div>
  );
};
