// // src/app/api/chat/route.ts
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const { message, conversationId } = await req.json();

//   if (!message || typeof message !== "string") {
//     return NextResponse.json({ error: "'message' is required" }, { status: 400 });
//   }


//   const BOTPRESS_URL = process.env.BOTPRESS_URL;
//   const BOTPRESS_TOKEN = process.env.BOTPRESS_TOKEN;
//   let botpressReply = "";

//   if (BOTPRESS_URL && BOTPRESS_TOKEN) {
//     try {
//       const bpRes = await fetch(BOTPRESS_URL, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${BOTPRESS_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           type: "text",
//           text: message,
//           conversationId: conversationId || "eduvator-local",
//         }),
//       });

//       const bpData = await bpRes.json();
//       botpressReply =
//         bpData?.responses?.[0]?.text ||
//         bpData?.responses?.[0]?.payload?.text ||
//         bpData?.text ||
//         "";
//     } catch (e) {
//       console.error("Botpress error:", e);
//     }
//   }

//   if (botpressReply) {
//     return NextResponse.json({ reply: botpressReply });
//   }

  
//   const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
//   if (!OPENAI_API_KEY) {
//     return NextResponse.json({ reply: "🧠 AI not configured yet." });
//   }

//   const oai = await fetch("https://api.openai.com/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${OPENAI_API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "system",
//           content:
//             "You are Eduvator, an encouraging AI tutor. Be clear, concise, and provide step-by-step explanations when helpful.",
//         },
//         { role: "user", content: message },
//       ],
//       temperature: 0.3,
//     }),
//   });

//   const data = await oai.json();
//   const text =
//     data?.choices?.[0]?.message?.content ?? "Sorry, I couldn't answer that.";

//   console.log("Botpress URL:", BOTPRESS_URL);
//   console.log("OpenAI Key:", OPENAI_API_KEY ? "Loaded" : "Missing");

//   return NextResponse.json({ reply: text });
// }


import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    // 1) Try OpenAI
    if (process.env.OPENAI_API_KEY) {
      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: message }]
          })
        })

        if (res.ok) {
          const data = await res.json()
          const reply = data.choices?.[0]?.message?.content ?? "⚠️ No response from OpenAI"
          return NextResponse.json({ reply })
        }
      } catch (err) {
        console.error("OpenAI error:", err)
      }
    }

    // 2) Try Botpress
    if (process.env.BOTPRESS_URL && process.env.BOTPRESS_TOKEN) {
      try {
        const res = await fetch(process.env.BOTPRESS_URL, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.BOTPRESS_TOKEN}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ type: "text", text: message })
        })

        if (res.ok) {
          const data = await res.json()
          const reply = data.responses?.[0]?.text ?? "⚠️ No response from Botpress"
          return NextResponse.json({ reply })
        }
      } catch (err) {
        console.error("Botpress error:", err)
      }
    }

    // 3) Fallback → echo (never breaks)
    return NextResponse.json({
      reply: `Echo: ${message} ✅`
    })

  } catch (err) {
    console.error("Unexpected error:", err)
    return NextResponse.json({ reply: "⚠️ Server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ message: "Chat API is alive 🚀 (Vercel)" })
}
