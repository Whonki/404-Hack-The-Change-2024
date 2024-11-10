import React from "react";
import "./ChatSidebar.css"; // Style file for sidebar

const ChatSidebar = ({ rooms, activeRoom, onRoomSelect }) => {
  return (
    <div className="chat-sidebar">
      <h2 className="sidebar-title">Chats</h2>
      <ul className="room-list">
        {rooms.map((room) => (
          <li
            key={room.id}
            onClick={() => onRoomSelect(room)}
            className={`room-item ${room.id === activeRoom?.id ? "active" : ""}`}
          >
            <div className="room-name">{room.name || "Chat Room"}</div>
            {room.lastMessage && (
              <div className="last-message">
                {room.lastMessage.content.slice(0, 30)}...
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatSidebar;
