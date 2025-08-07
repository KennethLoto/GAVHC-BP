"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^-_])[A-Za-z\d@$!%*?&#^-_]{8,}$/,
        "Password must include uppercase, lowercase, number, and special character"
      ),
    confirmPassword: z.string().min(8, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof formSchema>;

export function useResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    setIsLoading(true);
    try {
      const { error } = await authClient.resetPassword({
        newPassword: values.password,
        token,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Password reset successfully");
        router.push("/reset-password/success");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    onSubmit,
  };
}
