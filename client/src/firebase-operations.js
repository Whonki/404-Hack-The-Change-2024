// firebaseOperations.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

// Client-side version of createLawyer
const createLawyer = async (lawyerData) => {
  try {
    const docRef = await addDoc(collection(db, "Lawyers"), {
      ...lawyerData,
      Ratings: lawyerData.Ratings,
      Tags: lawyerData.Tags || [],
      Specializations: lawyerData.Specializations || [],
      Credentials: lawyerData.Credentials || [],
      Affiliations: lawyerData.Affiliations || [],
      CreatedAt: serverTimestamp(),
      LastLogin: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating lawyer:", error);
    throw error;
  }
};

// Client-side version of createClient
const createClient = async (clientData) => {
  try {
    const docRef = await addDoc(collection(db, "Clients"), {
      ...clientData,
      CreatedAt: serverTimestamp(),
      LastLogin: serverTimestamp(),
      Tags: clientData.Tags || [],
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating client:", error);
    throw error;
  }
};

// Client-side version of createPost
const createPost = async (post) => {
  try {
    const docRef = await addDoc(collection(db, "Posts"), {
      ...post,
      CreatedAt: serverTimestamp(),
      Status: post.Status || "active",
      Visibility: post.Visibility || "public",
      Tags: post.Tags || [],
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

// Client-side version of createChatroom
const createChatroom = async (participants) => {
  try {
    console.log(participants)
    const docRef = await addDoc(collection(db, "Chatrooms"), {
      Users: participants,
      CreatedAt: serverTimestamp(),
      LastMessageAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating chatroom:", error);
    throw error;
  }
};

// Client-side version of sendMessage
const sendMessage = async (chatroomId, userId, content) => {
  try {
    const docRef = await addDoc(
      collection(db, "Chatrooms", chatroomId, "Messages"),
      {
        UserId: userId,
        Content: content,
        CreatedAt: serverTimestamp(),
      }
    );
    return docRef.id;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export { createLawyer, createClient, createPost, createChatroom, sendMessage };
