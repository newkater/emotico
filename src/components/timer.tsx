import { FC, useEffect, useState } from "react";
import { Badge } from "./ui/badge";

interface IProps {
  initial: number;
  onTimeLimit?: () => void;
}

export const Timer: FC<IProps> = ({ initial, onTimeLimit }) => {
  const [time, setTime] = useState(initial);

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime((prev) => prev - 1);
      }
    }, 1000);

    if (time <= 0) {
      clearInterval(timer);
      if (onTimeLimit) {
        onTimeLimit();
      }
    }

    return () => {
      clearInterval(timer);
    };
  }, [time, onTimeLimit]);

  return <Badge className="text-lg" variant="default">{time}</Badge>;
};
