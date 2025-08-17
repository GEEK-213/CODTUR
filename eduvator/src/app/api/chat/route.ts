import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

  // Temporary fake response (later Botpress/OpenAI)
  return NextResponse.json({
    reply: `Eduvator AI says: "${message}"`,
  });
}
