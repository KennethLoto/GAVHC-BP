import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { authClient } from "@/lib/auth-client";

export const formSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email"),
});

export type ForgotPasswordFormValues = z.infer<typeof formSchema>;

export function useForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setIsLoading(true);

    try {
      const { error } = await authClient.forgetPassword({
        email: values.email,
        redirectTo: "/reset-password",
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      await fetch("/api/set-reset-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email }),
      });

      toast.success("Password reset email sent");
      router.push("/forgot-password/email-sent");
    } catch (err: unknown) {
      console.error("Unexpected error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { form, onSubmit, isLoading };
}
