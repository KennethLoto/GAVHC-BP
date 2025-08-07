import Link from "next/link";

import { ResetPasswordForm } from "@/components/forms/reset-password-form";
import Image from "next/image";
import { Activity } from "lucide-react";
import ResetPasswordSuccess from "@/components/auth/reset-password-success";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ResetPasswordSuccessPage() {
  const cookieStore = await cookies();
  const success = cookieStore.get("reset_success")?.value;

  if (!success) {
    redirect("/reset-password");
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-bold"
        >
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Activity className="size-4" />
          </div>
          GAVHC-BP
        </Link>
        <ResetPasswordSuccess />
      </div>
    </div>
  );
}
