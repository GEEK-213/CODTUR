function MessageBubble({ sender, text }) {
  const isUser = sender === "user";
  return (
    <div style={{ textAlign: isUser ? "right" : "left", margin: "8px" }}>
      <span
        style={{
          display: "inline-block",
          padding: "10px",
          borderRadius: "12px",
          backgroundColor: isUser ? "#d1e7ff" : "#f0f0f0",
        }}
      >
        <strong>{isUser ? "You" : "CodeMentor"}:</strong> {text}
      </span>
    </div>
  );
}

export default MessageBubble;
