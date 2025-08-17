import { useState } from "react";
import MessageList from "./MessageList";
import ChatBox from "./ChatBox";

function App() {
  const [messages, setMessages] = useState([]);

  const handleSend = (text) => {
    const newMessage = { sender: "user", text };
    setMessages([...messages, newMessage]);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", border: "1px solid #ddd", borderRadius: "12px" }}>
      <h2 style={{ textAlign: "center", padding: "10px" }}>💬 Chat with CodeMentor</h2>
      <MessageList messages={messages} />
      <ChatBox onSend={handleSend} />
    </div>
  );
}

export default App;
