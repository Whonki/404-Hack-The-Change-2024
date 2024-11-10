import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { db } from "../firebase";
import ChatInput from "../components/ChatInput";
import ChatSidebar from "../components/ChatSidebar";
import  "./ChatInterface.css";
import { doc, getDoc } from "firebase/firestore"; // import Firestore methods

const ChatInterface = ({ currentUserId }) => {
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

// Helper function to fetch user name by ID from Clients or Lawyers collection
const fetchUserName = async (userId) => {
  let userDoc = await getDoc(doc(db, "Clients", userId));
  if (userDoc.exists()) {
    return userDoc.data().name; // Assuming 'name' field holds the user's name in Clients
  }

  userDoc = await getDoc(doc(db, "Lawyers", userId));
  if (userDoc.exists()) {
    return userDoc.data().name; // Assuming 'name' field holds the user's name in Lawyers
  }

  return "Unknown User"; // Default if user not found
};

  const { roomId } = useParams(); // Get roomId from the URL
  const navigate = useNavigate();
  // Use roomId as needed, e.g., set as activeRoom on load
  useEffect(() => {
    if (roomId) {
      // Logic to set activeRoom based on roomId
    }
  }, [roomId]);

  useEffect(() => {
    console.log("Rooms: ", rooms);
  }, [rooms]);
  
  useEffect(() => {
    console.log("Active Room: ", activeRoom);
  }, [activeRoom]);
  
  useEffect(() => {
    console.log("Messages: ", messages);
  }, [messages]);

  const handleCreateOrSelectRoom = async (recipientId) => {
    const existingRoomQuery = query(
      collection(db, "Chatrooms"),
      where("participants", "array-contains", currentUserId)
    );

    const roomSnapshot = await getDocs(existingRoomQuery);
    let existingRoom = null;
    roomSnapshot.forEach((doc) => {
      const room = doc.data();
      if (room.participants.includes(recipientId)) {
        existingRoom = { id: doc.id, ...room };
      }
    });

    if (existingRoom) {
      setActiveRoom(existingRoom);
    } else {
      const newRoomRef = await addDoc(collection(db, "Chatrooms"), {
        participants: [currentUserId, recipientId],
        createdAt: serverTimestamp(),
        lastMessageAt: serverTimestamp(),
      });

      setActiveRoom({
        id: newRoomRef.id,
        participants: [currentUserId, recipientId],
      });
    }
    navigate(`/chat/${roomId}`);
  };

  // Update useEffect to load room and fetch other user's name
useEffect(() => {
  if (roomId) {
    const fetchRoomAndUser = async () => {
      try {
        const roomDoc = await getDoc(doc(db, "Chatrooms", roomId));
        if (roomDoc.exists()) {
          const roomData = roomDoc.data();
          const otherUserId = roomData.participants.find(id => id !== currentUserId);
          const otherUserName = await fetchUserName(otherUserId);

          setActiveRoom({
            id: roomDoc.id,
            ...roomData,
            otherUserName, // Add the fetched user name here
          });
        } else {
          console.error("Room not found");
          setActiveRoom(null);
        }
      } catch (error) {
        console.error("Error fetching active room:", error);
      }
    };
    fetchRoomAndUser();
  }
}, [roomId, currentUserId]);
  useEffect(() => {
    if (!activeRoom) return;

    const messagesQuery = query(
      collection(db, "Messages"),
      where("roomId", "==", activeRoom.id),
      orderBy("timestamp", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messagesData = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
          isCurrentUser: doc.data().senderId === currentUserId,
        }))
        .reverse();

      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [activeRoom, currentUserId]);

  const handleSendMessage = async (content) => {
    if (!activeRoom || !content.trim()) return;

    try {
      await addDoc(collection(db, "Messages"), {
        content,
        roomId: activeRoom.id,
        senderId: currentUserId,
        senderName: "Current User",
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="chat-container">
      <ChatSidebar 
        rooms={rooms} 
        activeRoom={activeRoom} 
        onRoomSelect={setActiveRoom} 
      />
      <div className="chat-main">
        {activeRoom ? (
          <>
            <div className="chat-header">
              <h2 className="chat-title">
                {activeRoom.Users || "Chat Room"}
              </h2>
              <p className="chat-participants">
                {activeRoom.Users.length} participants
              </p>
            </div>
            <MessageList messages={messages} />
            <ChatInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="chat-empty">
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
