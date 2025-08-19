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

import { useEffect, useMemo, useRef, useState } from "react";
import {
  MessageSquare,
  PlusCircle,
  Settings,
  Info,
  User,
  Bot,
  PencilLine,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Send,
  Sun,
  Moon
} from "lucide-react";
import ReactMarkdown from "react-markdown";

// ----------------------
// Types
// ----------------------

interface Msg {
  id: string;
  role: "user" | "bot";
  content: string;
  ts: number;
}

interface Chat {
  id: string;
  title: string;
  messages: Msg[];
  createdAt: number;
}

// ----------------------
// Utilities
// ----------------------

const uid = () => Math.random().toString(36).slice(2, 10);
const fmtTime = (t: number) => new Date(t).toLocaleTimeString();

const LOCAL_KEY = "eduvator.chats.v1";
const THEME_KEY = "eduvator.theme";

// ----------------------
// Component
// ----------------------

export default function EduvatorChat() {
  // Theme
  const [theme, setTheme] = useState<"dark" | "light">(() =>
    (typeof window !== "undefined" && (localStorage.getItem(THEME_KEY) as any)) || "dark"
  );

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Chats
  const [chats, setChats] = useState<Chat[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      if (!raw) return [];
      return JSON.parse(raw) as Chat[];
    } catch {
      return [];
    }
  });
  const [activeId, setActiveId] = useState<string>(() => chats[0]?.id || "");

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(chats));
    if (!activeId && chats[0]) setActiveId(chats[0].id);
  }, [chats, activeId]);

  const activeChat = useMemo(() => chats.find(c => c.id === activeId), [chats, activeId]);

  // Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Input + sending
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages.length, sending]);

  // Hotkeys
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        (document.getElementById("eduvator-input") as HTMLTextAreaElement)?.focus();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "n") {
        e.preventDefault();
        handleNewChat();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Actions
  function handleNewChat() {
    const id = uid();
    const next: Chat = {
      id,
      title: "New Chat",
      messages: [],
      createdAt: Date.now()
    };
    setChats(prev => [next, ...prev]);
    setActiveId(id);
    setInput("");
  }

  function handleRenameChat(id: string) {
    const title = prompt("Rename chat:");
    if (!title) return;
    setChats(prev => prev.map(c => (c.id === id ? { ...c, title } : c)));
  }

  function handleDeleteChat(id: string) {
    if (!confirm("Delete this chat? This cannot be undone.")) return;
    setChats(prev => prev.filter(c => c.id !== id));
    if (activeId === id) setActiveId(chats.find(c => c.id !== id)?.id || "");
  }

  async function sendMessage() {
    if (!input.trim()) return;
    setError(null);
    setSending(true);

    // Ensure there is an active chat
    let currentId = activeId;
    if (!currentId) {
      handleNewChat();
      currentId = activeId || chats[0]?.id || ""; // after handleNewChat state may lag; safe guard
    }

    // 1) push user message
    const userMsg: Msg = { id: uid(), role: "user", content: input, ts: Date.now() };
    setChats(prev =>
      prev.map(c =>
        c.id === activeId
          ? { ...c, title: c.messages.length === 0 ? input.slice(0, 32) : c.title, messages: [...c.messages, userMsg] }
          : c
      )
    );

    setInput("");

    // 2) optimistic typing bubble
    const tempBot: Msg = { id: uid(), role: "bot", content: "", ts: Date.now() };
    setChats(prev => prev.map(c => (c.id === activeId ? { ...c, messages: [...c.messages, tempBot] } : c)));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.content })
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      const reply = String(data.reply ?? "Sorry, I couldn't answer that.");

      // 3) replace temp bot message
      setChats(prev =>
        prev.map(c =>
          c.id === activeId
            ? {
                ...c,
                messages: c.messages.map(m => (m.id === tempBot.id ? { ...m, content: reply } : m))
              }
            : c
        )
      );
    } catch (e: any) {
      setError(e?.message || "Failed to reach API");
      setChats(prev =>
        prev.map(c =>
          c.id === activeId
            ? {
                ...c,
                messages: c.messages.map(m => (m.id === tempBot.id ? { ...m, content: "⚠️ Something went wrong." } : m))
              }
            : c
        )
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white dark:text-white">
      {/* Sidebar */}
      <aside
        className={`$${""} ${
          sidebarOpen ? "w-72" : "w-14"
        } transition-all duration-300 bg-black/50 backdrop-blur-lg border-r border-gray-800 flex flex-col p-3 shadow-xl`}
      >
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => setSidebarOpen(s => !s)}
            className="p-2 rounded-lg bg-gray-800/60 hover:bg-gray-700"
            title={sidebarOpen ? "Collapse" : "Expand"}
          >
            {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>

          {sidebarOpen && (
            <button
              onClick={handleNewChat}
              className="flex-1 ml-2 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 transition px-3 py-2 rounded-xl text-white font-medium shadow-md"
            >
              <PlusCircle size={18} /> New Chat
            </button>
          )}
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {chats.length === 0 && sidebarOpen && (
            <p className="text-xs text-gray-400 px-2">No chats yet. Press <kbd className="px-1 py-0.5 bg-gray-800 rounded">Ctrl</kbd>+
              <kbd className="px-1 py-0.5 bg-gray-800 rounded">N</kbd> to create one.</p>
          )}

          {chats.map(chat => (
            <div
              key={chat.id}
              className={`group rounded-lg border border-transparent hover:border-gray-700 ${
                activeId === chat.id ? "bg-gray-800/60" : "bg-gray-900/40"
              }`}
            >
              <button
                onClick={() => setActiveId(chat.id)}
                className="w-full flex items-center gap-2 px-3 py-2 text-left"
              >
                <MessageSquare size={16} className="text-emerald-400 shrink-0" />
                {sidebarOpen && (
                  <div className="flex-1 truncate">
                    <div className="truncate text-sm">{chat.title || "Untitled"}</div>
                    <div className="text-[10px] text-gray-400">{new Date(chat.createdAt).toLocaleDateString()}</div>
                  </div>
                )}
              </button>
              {sidebarOpen && (
                <div className="flex items-center gap-1 px-2 pb-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => handleRenameChat(chat.id)}
                    className="text-xs px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 flex items-center gap-1"
                  >
                    <PencilLine size={14} /> Rename
                  </button>
                  <button
                    onClick={() => handleDeleteChat(chat.id)}
                    className="text-xs px-2 py-1 rounded bg-red-600/80 hover:bg-red-600 flex items-center gap-1"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-3 border-t border-gray-800 pt-3 text-xs text-gray-400 space-y-2">
          {sidebarOpen && (
            <>
              <p className="flex items-center gap-2 cursor-pointer hover:text-white transition">
                <Settings size={14} /> Settings
              </p>
              <p className="flex items-center gap-2 cursor-pointer hover:text-white transition">
                <Info size={14} /> About Eduvator
              </p>
            </>
          )}

          <button
            onClick={() => setTheme(t => (t === "dark" ? "light" : "dark"))}
            className="w-full flex items-center justify-center gap-2 bg-gray-800/60 hover:bg-gray-700 px-2 py-2 rounded-lg"
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />} {sidebarOpen && (theme === "dark" ? "Light mode" : "Dark mode")}
          </button>
        </div>
      </aside>

      {/* Chat Window */}
      <section className="flex-1 flex flex-col">
        {/* Header */}
        <header className="p-4 border-b border-gray-800 text-center bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600 animate-gradient-x bg-[length:200%_200%]">
          <h1 className="text-xl font-extrabold tracking-wide drop-shadow-md">Eduvator 💡</h1>
          <p className="text-sm opacity-90">Your AI tutor for smarter learning</p>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeChat?.messages.length ? (
            activeChat.messages.map(m => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex items-start gap-3 px-4 py-3 rounded-2xl max-w-[75%] text-sm leading-relaxed shadow-md border transition-all ${
                    m.role === "user"
                      ? "bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-br-none border-emerald-400/30"
                      : "bg-gray-900/70 text-gray-100 rounded-bl-none border-gray-700"
                  }`}
                >
                  {m.role === "user" ? (
                    <div className="shrink-0 rounded-full bg-white/20 p-1"><User size={16} /></div>
                  ) : (
                    <div className="shrink-0 rounded-full bg-emerald-500/20 p-1"><Bot size={16} className="text-emerald-400" /></div>
                  )}

                  <div className="prose prose-invert prose-p:my-2 prose-pre:bg-gray-800/60 max-w-none">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                    <div className="text-[10px] mt-1 opacity-60">{fmtTime(m.ts)}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full grid place-items-center text-center text-gray-400">
              <div>
                <h2 className="text-lg font-semibold mb-2">Start a conversation</h2>
                <p className="text-sm">Ask for explanations, summaries, quiz questions, or study plans.</p>
              </div>
            </div>
          )}

          {sending && (
            <div className="flex justify-start">
              <div className="bg-gray-900/70 border border-gray-700 px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-2 text-sm">
                <Loader2 className="animate-spin" size={14} />
                Thinking…
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Error bar */}
        {error && (
          <div className="px-4 pb-2 -mt-2">
            <div className="text-xs text-red-300 bg-red-900/30 border border-red-700 rounded-lg px-3 py-2">
              {error}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-gray-800 p-4 bg-black/40 backdrop-blur-lg">
          <div className="flex items-end gap-2">
            <textarea
              id="eduvator-input"
              rows={1}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  !sending && sendMessage();
                }
              }}
              placeholder="Ask Eduvator anything… (Shift+Enter for newline)"
              className="flex-1 resize-none bg-gray-900/70 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400"
            />
            <button
              onClick={sendMessage}
              disabled={sending || !input.trim()}
              className="h-11 px-4 rounded-xl font-medium text-white shadow-lg disabled:opacity-50 bg-emerald-500 hover:bg-emerald-600 flex items-center gap-2"
            >
              <Send size={16} />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
          <div className="flex items-center justify-between text-[10px] text-gray-400 mt-2">
            <span>Press <kbd className="px-1 py-0.5 bg-gray-800 rounded">Enter</kbd> to send • <kbd className="px-1 py-0.5 bg-gray-800 rounded">Shift</kbd>+<kbd className="px-1 py-0.5 bg-gray-800 rounded">Enter</kbd> for newline</span>
            <span>
              Shortcuts: <kbd className="px-1 py-0.5 bg-gray-800 rounded">Ctrl</kbd>+<kbd className="px-1 py-0.5 bg-gray-800 rounded">K</kbd> focus, <kbd className="px-1 py-0.5 bg-gray-800 rounded">Ctrl</kbd>+<kbd className="px-1 py-0.5 bg-gray-800 rounded">N</kbd> new chat
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
// v3