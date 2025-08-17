import { useState, useRef, useEffect } from "react";
import MessageList from "./MessageList";
import ChatBox from "./ChatBox";

function App() {
  const [messages, setMessages] = useState([]);
  const listRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);
const handleSend = async (text) => {
  const userMsg = { sender: "user", text };
  setMessages((prev) => [...prev, userMsg]);

  try {
    const res = await fetch("/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    const botMsg = { sender: "codementor", text: data.reply };

    setMessages((prev) => [...prev, botMsg]);
  } catch (err) {
    console.error(err);
    const botMsg = { sender: "codementor", text: "⚠️ Server error!" };
    setMessages((prev) => [...prev, botMsg]);
  }
};

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", border: "1px solid #ddd", borderRadius: "12px" }}>
      <h2 style={{ textAlign: "center", padding: "10px" }}>💬 Chat with CodeMentor</h2>
      <div ref={listRef} style={{ height: "300px", overflowY: "auto" }}>
        <MessageList messages={messages} />
      </div>
      <ChatBox onSend={handleSend} />
    </div>
  );
}

export default App;
