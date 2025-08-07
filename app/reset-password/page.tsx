// app/reset-password/page.tsx or similar
import { redirect } from "next/navigation";
import { ResetPasswordForm } from "@/components/forms/reset-password-form";
import Link from "next/link";
import { Activity } from "lucide-react";

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams.token;

  if (!token) {
    redirect("/forgot-password");
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
        <ResetPasswordForm />
      </div>
    </div>
  );
}
