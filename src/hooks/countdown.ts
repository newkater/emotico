import { useEffect, useState } from "react";

export const useCountdown = (interval: number = 1) => {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [callback, setCallback] = useState<(() => void) | undefined>(undefined);

  useEffect(() => {
    if (isActive) {
      const timer = setInterval(() => {
        if (time > 0 && isActive) {
          setTime((prev) => prev - interval);
        }
      }, interval * 1000);

      if (time <= 0 && isActive) {
        if (callback) {
          setIsActive(false)
          callback();
        }
      }

      return () => {
        clearInterval(timer);
      };
    }
  }, [time, isActive, callback, interval]);

  const startTimer = (initial: number, onFinish: () => void) => {
    setTime(initial);
    setIsActive(true);
    setCallback(onFinish);
  };

  const clearTimer = () => {
    setIsActive(false);
    setCallback(undefined);
    setTime(0);
  };

  return { time, startTimer, clearTimer, timerActive: isActive };
};
