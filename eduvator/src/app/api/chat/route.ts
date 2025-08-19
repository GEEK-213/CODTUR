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


// src/app/api/chat/route.ts
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // 1. If Botpress is configured → use Botpress
    if (process.env.BOTPRESS_URL && process.env.BOTPRESS_TOKEN) {
      const response = await fetch(`${process.env.BOTPRESS_URL}/api/v1/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.BOTPRESS_TOKEN}`,
        },
        body: JSON.stringify({ messages }),
      })

      if (!response.ok) {
        throw new Error("Botpress API failed")
      }

      const data = await response.json()
      return NextResponse.json({ reply: data.reply || "Botpress response" })
    }

    // 2. If OpenAI is configured → use OpenAI
    if (process.env.OPENAI_API_KEY) {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages,
        }),
      })

      if (!response.ok) {
        throw new Error("OpenAI API failed")
      }

      const data = await response.json()
      return NextResponse.json({
        reply: data.choices[0].message?.content || "OpenAI response",
      })
    }

    // 3. Fallback → Echo (so your chat never breaks)
    const lastMsg = messages[messages.length - 1]?.content || "Hello!"
    return NextResponse.json({ reply: `Echo: ${lastMsg}` })
  } catch (err) {
    console.error("Error in chat route:", err)
    return NextResponse.json(
      { reply: "Something went wrong on the server." },
      { status: 500 }
    )
  }
}
