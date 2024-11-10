// firebaseOperations.js
import { collection, addDoc, serverTimestamp,updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

// Client-side version of createLawyer
const createLawyer = async (lawyerData) => {
  try {
    const docRef = await addDoc(collection(db, "Lawyers"), {
      Name: lawyerData.Name,
      Email: lawyerData.Email,
      Password: lawyerData.Password,
      Phone: lawyerData.Phone,
      ProfilePic: lawyerData.ProfilePic,
      Tags: lawyerData.Tags || [],
      Specializations: lawyerData.Specializations || [],
      Languages: lawyerData.Languages || [],
      Credentials: lawyerData.Credentials || [],
      Affiliations: lawyerData.Affiliations || [],
      Ratings: lawyerData.Ratings,
      CreatedAt: serverTimestamp(),
      LastLogin: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating lawyer:", error);
    throw error;
  }
};

const updateLawyer = async (docId, updates) => {
  try {
    const postRef = doc(db, "Lawyer", docId);
    await updateDoc(postRef, updates);
    console.log(`Lawyer with ID ${docId} successfully updated.`);
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

const deleteLawyer = async (docId) => {
  try {
    const postRef = doc(db, "Lawyers", docId);
    await deleteDoc(postRef);
    console.log(`Lawyer with ID ${docId} successfully removed.`);
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

// Client-side version of createClient
const createClient = async (clientData) => {
  try {
    const docRef = await addDoc(collection(db, "Clients"), {
      Name: clientData.Name,
      Email: clientData.Email,
      Password: clientData.Password,
      ProfilePic: clientData.ProfilePic,
      Phone: clientData.Phone,
      Tags: clientData.Tags || [],
      Languages: clientData.Languages || [],
      CreatedAt: serverTimestamp(),
      LastLogin: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating client:", error);
    throw error;
  }
};

const updateClient = async (docId, updates) => {
  try {
    const postRef = doc(db, "Clients", docId);
    await updateDoc(postRef, updates);
    console.log(`Client with ID ${docId} successfully updated.`);
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

const deleteClient = async (docId) => {
  try {
    const postRef = doc(db, "Clients", docId);
    await deleteDoc(postRef);
    console.log(`Client with ID ${docId} successfully removed.`);
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

// Client-side version of createPost
const createPost = async (post) => {
  try {
    const docRef = await addDoc(collection(db, "Posts"), {
      Title: post.Title,
      Content: post.Content,
      UserId: post.UserId,
      Languages: post.Languages || [],
      Status: post.Status || "active",
      Visibility: post.Visibility || "public",
      Tags: post.Tags || [],
      CreatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

const updatePost = async (docId, updates) => {
    try {
      const postRef = doc(db, "Posts", docId);
      await updateDoc(postRef, updates);
      console.log(`Document with ID ${docId} successfully updated.`);
    } catch (error) {
      console.error("Error updating document:", error);
      throw error;
    }
  };
  
  const deletePost = async (docId) => {
    try {
      const postRef = doc(db, "Posts", docId);
      await deleteDoc(postRef);
      console.log(`Document with ID ${docId} successfully removed.`);
    } catch (error) {
      console.error("Error updating document:", error);
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

const updateMessage = async (chatroomId, userId, content) => {
  try {
    const docRef = await updateDoc(
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


// Client-side version of sendMessage
const deleteMessage = async (chatroomId, userId, docId) => {
  try {
    const posRef = doc("Chatrooms", chatroomId, "Messages", userId, docId)
    await deleteDoc(posRef);
    return docRef.id;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export { 
  createLawyer, 
  updateLawyer, 
  deleteLawyer,

  createClient, 
  updateClient,
  deleteClient,

  createPost, 
  updatePost, 
  deletePost,

  createChatroom, 

  sendMessage,
  updateMessage,
  deleteMessage };
