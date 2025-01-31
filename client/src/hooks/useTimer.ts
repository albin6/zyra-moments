import { useState, useCallback, useEffect } from "react";

export const useTimer = (initialTime: number) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = useCallback(() => {
    setIsRunning(true);
  }, []);

  const resetTimer = useCallback(() => {
    setTimeLeft(initialTime);
    setIsRunning(false);
  }, [initialTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, timeLeft]);

  return { timeLeft, startTimer, resetTimer };
};
