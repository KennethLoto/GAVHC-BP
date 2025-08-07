import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4 text-center">
      <p className="text-lg font-medium">This is the landing page.</p>
      <div className="flex gap-2">
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <Link href="/signup">
          <Button>Signup</Button>
        </Link>
      </div>
    </main>
  );
}
