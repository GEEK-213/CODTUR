import { NextResponse } from "next/server"

// POST /api/chat
export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      )
    }

    return NextResponse.json({
      reply: `You said: ${message} ✅ (API working on Vercel)`
    })
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    )
  }
}

// GET /api/chat
export async function GET() {
  return NextResponse.json({
    message: "Chat API is alive 🚀"
  })
}
