// "use client";

// import { useState, useEffect, useRef } from "react";
// import { MessageSquare, PlusCircle, Settings, Info } from "lucide-react";

// interface Message {
//   role: "user" | "bot";
//   content: string;
// }

// export default function Home() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const chatEndRef = useRef<HTMLDivElement>(null);

//   // Fake chat history
//   const [chats, setChats] = useState<string[]>(["Math Revision", "History Notes"]);

//   // Auto scroll
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, loading]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     setLoading(true);

//     const userMessage: Message = { role: "user", content: input };
//     setMessages((prev) => [...prev, userMessage]);

//     try {
//       const res = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: input }),
//       });

//       const data = await res.json();

//       const botMessage: Message = { role: "bot", content: data.reply };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (err) {
//       console.error("Error:", err);
//       setMessages((prev) => [
//         ...prev,
//         { role: "bot", content: "⚠️ Something went wrong." },
//       ]);
//     }

//     setInput("");
//     setLoading(false);
//   };

//   return (
//     <main className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
//       {/* Sidebar */}
//       <aside className="w-64 bg-black/40 backdrop-blur-xl border-r border-gray-800 flex flex-col p-4 shadow-lg">
//         <button
//           onClick={() => {
//             setMessages([]);
//             setChats((prev) => ["New Chat", ...prev]);
//           }}
//           className="mb-6 flex items-center gap-2 bg-green-500/90 hover:bg-green-600 transition px-4 py-2 rounded-xl text-white font-medium shadow-md"
//         >
//           <PlusCircle size={18} /> New Chat
//         </button>

//         {/* Chat History */}
//         <div className="flex-1 overflow-y-auto space-y-2">
//           {chats.map((chat, i) => (
//             <div
//               key={i}
//               className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/40 hover:bg-gray-700/60 cursor-pointer text-sm transition"
//             >
//               <MessageSquare size={16} className="text-green-400" />
//               {chat}
//             </div>
//           ))}
//         </div>

//         {/* Footer */}
//         <div className="mt-6 border-t border-gray-700 pt-4 text-sm text-gray-400 space-y-2">
//           <p className="flex items-center gap-2 cursor-pointer hover:text-white transition">
//             <Settings size={14} /> Settings
//           </p>
//           <p className="flex items-center gap-2 cursor-pointer hover:text-white transition">
//             <Info size={14} /> About Eduvator
//           </p>
//         </div>
//       </aside>

//       {/* Chat Window */}
//       <section className="flex-1 flex flex-col">
//         {/* Header */}
//         <header className="p-4 border-b border-gray-800 text-center bg-gradient-to-r from-green-500 via-emerald-400 to-green-600 animate-gradient-x bg-[length:200%_200%]">
//           <h1 className="text-xl font-extrabold tracking-wide drop-shadow-md">Eduvator 💡</h1>
//         </header>

//         {/* Chat messages */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-4">
//           {messages.map((m, i) => (
//             <div
//               key={i}
//               className={`flex ${
//                 m.role === "user" ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`px-4 py-3 rounded-2xl max-w-[75%] text-sm leading-relaxed shadow-md transition-all transform hover:scale-[1.02] ${
//                   m.role === "user"
//                     ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-br-none"
//                     : "bg-gray-800/70 backdrop-blur-md text-gray-100 rounded-bl-none border border-gray-700"
//                 }`}
//               >
//                 {m.content}
//               </div>
//             </div>
//           ))}

//           {/* Typing animation */}
//           {loading && (
//             <div className="flex justify-start">
//               <div className="bg-gray-800/70 px-3 py-2 rounded-2xl rounded-bl-none flex items-center space-x-1">
//                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
//                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
//                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
//               </div>
//             </div>
//           )}
//           <div ref={chatEndRef} />
//         </div>

//         {/* Input bar */}
//         <div className="border-t border-gray-700 p-4 bg-black/40 backdrop-blur-lg flex items-center gap-2">
//           <input
//             type="text"
//             className="flex-1 bg-gray-900/70 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Ask Eduvator anything..."
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           />
//           <button
//             onClick={sendMessage}
//             disabled={loading}
//             className="bg-green-500 hover:bg-green-600 transition px-5 py-3 rounded-xl font-medium text-white shadow-lg disabled:opacity-50"
//           >
//             {loading ? "..." : "Send"}
//           </button>
//         </div>
//       </section>
//     </main>
//   );
// }


"use client";
import { useState, useEffect, useRef } from "react";
import { MessageSquare, PlusCircle, Settings, Info, User, Bot } from "lucide-react";

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function EduvatorChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [chats, setChats] = useState<string[]>(["Math Revision", "History Notes"]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      const botMessage: Message = { role: "bot", content: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "bot", content: "⚠️ Something went wrong." }]);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-black/50 backdrop-blur-lg border-r border-gray-700 flex flex-col p-4 shadow-xl">
        <button
          onClick={() => {
            setMessages([]);
            setChats((prev) => ["New Chat", ...prev]);
          }}
          className="mb-6 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 transition px-4 py-2 rounded-xl text-white font-medium shadow-md"
        >
          <PlusCircle size={18} /> New Chat
        </button>

        <div className="flex-1 overflow-y-auto space-y-2">
          {chats.map((chat, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/40 hover:bg-gray-700/60 cursor-pointer text-sm transition"
            >
              <MessageSquare size={16} className="text-emerald-400" />
              {chat}
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-gray-700 pt-4 text-sm text-gray-400 space-y-2">
          <p className="flex items-center gap-2 cursor-pointer hover:text-white transition">
            <Settings size={14} /> Settings
          </p>
          <p className="flex items-center gap-2 cursor-pointer hover:text-white transition">
            <Info size={14} /> About Eduvator
          </p>
        </div>
      </aside>

      {/* Chat Window */}
      <section className="flex-1 flex flex-col">
        <header className="p-4 border-b border-gray-800 text-center bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600 animate-gradient-x bg-[length:200%_200%]">
          <h1 className="text-xl font-extrabold tracking-wide drop-shadow-md">Eduvator 💡</h1>
          <p className="text-sm opacity-80">Your AI tutor for smarter learning</p>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex items-start gap-2 px-4 py-3 rounded-2xl max-w-[75%] text-sm leading-relaxed shadow-md transition-all ${
                  m.role === "user"
                    ? "bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-br-none"
                    : "bg-gray-800/70 text-gray-100 rounded-bl-none border border-gray-700"
                }`}
              >
                {m.role === "user" ? <User size={16} /> : <Bot size={16} className="text-emerald-400" />}
                <span>{m.content}</span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-800/70 px-3 py-2 rounded-2xl flex items-center space-x-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-700 p-4 bg-black/40 backdrop-blur-lg flex items-center gap-2">
          <input
            type="text"
            className="flex-1 bg-gray-900/70 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Eduvator anything..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-emerald-500 hover:bg-emerald-600 transition px-5 py-3 rounded-xl font-medium text-white shadow-lg disabled:opacity-50"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </section>
    </main>
  );
}
