"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { signIn } from "@/server/users";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const formSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email"),
  password: z.string().nonempty("Password is required"),
  // .min(8, "Password must be at least 8 characters long")
  // .regex(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^-_])[A-Za-z\d@$!%*?&#^-_]{8,}$/,
  //   "Password must include uppercase, lowercase, number, and special character"
  // ),
});

export function useLoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signInWithGoogle = async () => {
    setIsGoogleSigningIn(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (error) {
      toast.error("Google login failed.");
      setIsGoogleSigningIn(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const { success, message } = await signIn(values.email, values.password);
    toast.error(message);

    if (success) {
      router.push("/dashboard");
    } else {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    isGoogleSigningIn,
    signInWithGoogle,
    onSubmit,
  };
}
