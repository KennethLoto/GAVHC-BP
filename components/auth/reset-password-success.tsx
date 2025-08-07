"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRedirectCooldown } from "@/hooks/use-redirect-cooldown";

export default function ResetPasswordSuccess() {
  const router = useRouter();
  const secondsLeft = useRedirectCooldown(5);

  useEffect(() => {
    if (secondsLeft === 0) {
      router.push("/login");
    }
  }, [secondsLeft, router]);

  return (
    <Card className="w-full max-w-sm shadow-lg border border-border rounded-xl">
      <CardHeader className="space-y-4 text-center">
        <div className="flex justify-center">
          <CheckCircle
            className="text-green-600"
            size={32}
            aria-hidden="true"
          />
        </div>
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Password Reset Successful
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed text-muted-foreground">
          Your password has been successfully updated. You will be redirected to
          the login page in <span className="font-medium">{secondsLeft}</span>{" "}
          second
          {secondsLeft !== 1 ? "s" : ""}.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-2">
        <Button
          variant="outline"
          className="w-full font-semibold"
          onClick={() => router.push("/login")}
        >
          Go to Login Now
        </Button>
      </CardContent>
    </Card>
  );
}
