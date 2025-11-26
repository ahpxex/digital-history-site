import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getAdminUser, validateAdminCredentials } from "@/lib/auth/admin";
import {
  decodeSession,
  encodeSession,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  type SessionUser,
} from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const cookieStore = await cookies();
  const encoded = cookieStore.get(SESSION_COOKIE)?.value;
  const user = decodeSession(encoded);

  return NextResponse.json(user ? { user } : {}, { status: 200 });
}

type SessionPayload = {
  email?: string;
  password?: string;
};

export async function POST(request: NextRequest) {
  const body = (await request.json()) as SessionPayload | null;

  if (!body?.email || !body.password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 },
    );
  }

  if (!validateAdminCredentials(body.email, body.password)) {
    return NextResponse.json(
      { message: "Invalid administrator credentials" },
      { status: 401 },
    );
  }

  const user: SessionUser = getAdminUser();

  const response = NextResponse.json({ user }, { status: 200 });

  response.cookies.set({
    name: SESSION_COOKIE,
    value: encodeSession(user),
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true }, { status: 200 });
  response.cookies.set({
    name: SESSION_COOKIE,
    value: "",
    path: "/",
    maxAge: 0,
  });
  return response;
}
