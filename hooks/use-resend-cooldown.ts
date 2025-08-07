import { useEffect, useState } from "react";

export function useResendCooldown(durationInSeconds: number) {
  const [cooldown, setCooldown] = useState(0);

  const startCooldown = () => {
    setCooldown(durationInSeconds);
  };

  const isCooldownActive = cooldown > 0;

  useEffect(() => {
    if (cooldown === 0) return;

    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldown]);

  return {
    cooldown,
    startCooldown,
    isCooldownActive,
  };
}
