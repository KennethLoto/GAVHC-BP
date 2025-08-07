import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useResendCooldown } from "@/hooks/use-resend-cooldown";

export function useForgotPasswordEmailSent(email: string) {
  const [isResending, setIsResending] = useState(false);
  const { cooldown, startCooldown, isCooldownActive } = useResendCooldown(60);

  async function handleResend() {
    if (isCooldownActive || isResending) return;

    setIsResending(true);

    try {
      const { error } = await authClient.forgetPassword({
        email,
        redirectTo: "/reset-password",
      });

      if (error) throw new Error(error.message);

      toast.success("Reset email resent.");
      startCooldown();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    } finally {
      setIsResending(false);
    }
  }

  return {
    isResending,
    isCooldownActive,
    cooldown,
    handleResend,
  };
}
