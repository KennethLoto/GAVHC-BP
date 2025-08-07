import { useEffect, useState } from "react";

export function useRedirectCooldown(duration: number) {
  const [secondsLeft, setSecondsLeft] = useState(duration);

  useEffect(() => {
    if (secondsLeft === 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  return secondsLeft;
}
