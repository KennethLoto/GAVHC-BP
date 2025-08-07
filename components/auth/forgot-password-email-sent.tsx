"use client";

import { CheckCircle, Loader2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForgotPasswordEmailSent } from "@/hooks/use-forgot-password-email-sent";

type ForgotPasswordEmailSentProps = {
  email: string;
};

export function ForgotPasswordEmailSent({
  email,
}: ForgotPasswordEmailSentProps) {
  const { isResending, isCooldownActive, cooldown, handleResend } =
    useForgotPasswordEmailSent(email);

  return (
    <Card className="w-full max-w-sm shadow-lg border border-border rounded-xl">
      <CardHeader className="text-center space-y-4">
        <div className="flex justify-center">
          <CheckCircle className="text-green-600" size={32} />
        </div>
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Email Sent
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm leading-relaxed">
          A password reset link has been sent to:
          <br />
          <span className="font-medium text-foreground">{email}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 pt-2">
        <div className="text-sm text-muted-foreground text-center leading-relaxed">
          If your email is registered with us, you’ll receive a link to reset
          your password shortly. Please check your inbox and spam folder.
        </div>

        <Button
          variant="outline"
          onClick={handleResend}
          disabled={isResending || isCooldownActive}
          className="w-full font-semibold flex items-center justify-center gap-2"
        >
          {isResending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Resending Email...
            </>
          ) : isCooldownActive ? (
            `Resend available in ${cooldown}s`
          ) : (
            "Resend Email"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
