import React, { useState } from "react";
import "./ChatInput.css"; // Ensure this CSS file styles the input appropriately

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="chat-input-container">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        className="chat-input"
      />
      <button onClick={handleSend} className="chat-send-button">
        Send
      </button>
    </div>
  );
};

export default ChatInput;
