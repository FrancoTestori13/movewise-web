import { NextResponse } from "next/server";
import * as cookie from "cookie";

export async function POST() {
  const res = NextResponse.json({ success: true });
  const serialized = cookie.serialize("token", "", {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
    maxAge: 0,
    path: "/",
  });
  res.headers.set("Set-Cookie", serialized);
  return res;
}
