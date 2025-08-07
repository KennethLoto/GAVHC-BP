import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email } = body;

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const cookieStore = await cookies();

  cookieStore.set("reset_email", email, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 2, // 2 minutes
  });

  cookieStore.set("reset_success", "true", {
    httpOnly: true,
    path: "/",
    maxAge: 60, // 1 minute
  });

  return NextResponse.json({ success: true });
}
