import MessageBubble from "./MessageBubble";

function MessageList({ messages }) {
  return (
    <div style={{ height: "300px", overflowY: "auto", padding: "10px" }}>
      {messages.map((msg, index) => (
        <MessageBubble key={index} sender={msg.sender} text={msg.text} />
      ))}
    </div>
  );
}

export default MessageList;
