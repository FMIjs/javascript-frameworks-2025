import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return NextResponse.json({ message: "Hello world" });
}

export async function POST(req: Request) {
  return NextResponse.json({ message: "Hello world" });
}
