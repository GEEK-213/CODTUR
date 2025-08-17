"use client";

import { useState, useEffect, useRef } from "react";

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Fake chat history
  const [chats, setChats] = useState<string[]>(["Math Revision", "History Notes"]);

  // Auto scroll
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
      console.error("Error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "⚠️ Something went wrong." },
      ]);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-black/60 border-r border-gray-800 flex flex-col p-4">
        <button
          onClick={() => {
            setMessages([]);
            setChats((prev) => ["New Chat", ...prev]);
          }}
          className="mb-4 bg-green-500 hover:bg-green-600 transition px-4 py-2 rounded-lg text-white font-medium"
        >
          + New Chat
        </button>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {chats.map((chat, i) => (
            <div
              key={i}
              className="px-3 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700 cursor-pointer text-sm"
            >
              {chat}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 border-t border-gray-700 pt-4 text-sm text-gray-400">
          <p className="mb-2">⚙️ Settings</p>
          <p>ℹ️ About Eduvator</p>
        </div>
      </aside>

      {/* Chat Window */}
      <section className="flex-1 flex flex-col">
        {/* Header */}
        <header className="p-4 border-b border-gray-800 text-center bg-black/40">
          <h1 className="text-xl font-bold text-green-400">Eduvator 💡</h1>
        </header>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-3 rounded-2xl max-w-[75%] text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-green-500 text-white rounded-br-none"
                    : "bg-gray-800 text-gray-100 rounded-bl-none"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {/* Typing animation */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-800 px-3 py-2 rounded-2xl rounded-bl-none flex items-center space-x-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input bar */}
        <div className="border-t border-gray-700 p-4 bg-black/60 flex items-center gap-2">
          <input
            type="text"
            className="flex-1 bg-gray-900 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Eduvator anything..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 transition px-5 py-3 rounded-xl font-medium text-white shadow-lg"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </section>
    </main>
  );
}
