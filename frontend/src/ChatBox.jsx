import { useState } from "react";

function ChatBox({ onSend }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    onSend(input);
    setInput("");
  };

  return (
    <div style={{ display: "flex", padding: "10px" }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        style={{ flex: 1, padding: "10px", borderRadius: "8px" }}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        onClick={handleSend}
        style={{ marginLeft: "8px", padding: "10px", borderRadius: "8px" }}
      >
        Send
      </button>
    </div>
  );
}

export default ChatBox;
