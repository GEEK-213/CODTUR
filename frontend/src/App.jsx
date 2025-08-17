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

  const handleSend = (text) => {
    const userMsg = { sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);

    // Fake CodeMentor reply after 1 sec
    setTimeout(() => {
      const botMsg = { sender: "codementor", text: "I'm CodeMentor! You said: " + text };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
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
