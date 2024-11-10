import React, { useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const TestDataGenerator = ({ firebaseAdmin }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const generateLawyerData = () => ({
    Name: `Lawyer ${Math.floor(Math.random() * 1000)}`,
    Email: `lawyer${Math.floor(Math.random() * 1000)}@test.com`,
    Phone: `+1${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
    Password: `Pass${Math.floor(Math.random() * 1000)}`,
    Tags: ["experienced", "professional", "responsive"],
    Specializations: [
      "Corporate Law",
      "Family Law",
      "Criminal Law",
      "Civil Law",
    ].slice(0, Math.floor(Math.random() * 3) + 1),
    Credentials: [
      {
        degree: "JD",
        institution: "Test University",
        year: 2010 + Math.floor(Math.random() * 10),
      },
      {
        degree: "Bar Admission",
        institution: "State Bar",
        year: 2012 + Math.floor(Math.random() * 10),
      },
    ],
    Affiliations: ["American Bar Association", "State Legal Association"],
    Ratings: [Math.random() * 10, Math.random() * 10],
  });

  const generateClientData = () => ({
    Name: `Client ${Math.floor(Math.random() * 1000)}`,
    Email: `client${Math.floor(Math.random() * 1000)}@test.com`,
    Password: `Pass${Math.floor(Math.random() * 1000)}`,
    Phone: `+1${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
    Tags: ["active", "verified"],
  });

  const generatePostData = (randomClientId) => ({
    Title: `Legal Question ${Math.floor(Math.random() * 1000)}`,
    Content: `This is a test legal question about ${
      ["corporate", "family", "criminal", "civil"][
        Math.floor(Math.random() * 4)
      ]
    } law.`,
    UserId: randomClientId,
    Status: ["active", "resolved", "pending"][Math.floor(Math.random() * 3)],
    Visibility: "public",
    Tags: ["urgent", "consultation", "advice"].slice(
      0,
      Math.floor(Math.random() * 3) + 1
    ),
  });

  const generateTestData = async () => {
    setLoading(true);
    setStatus("Generating test data...");

    try {
      // Generate 10 lawyers
      for (let i = 0; i < 10; i++) {
        const lawyerId = await firebaseAdmin.createLawyer(generateLawyerData());
        setStatus(`Created lawyer ${i + 1}/10`);
      }

      // Generate 20 clients
      for (let i = 0; i < 20; i++) {
        const clientId = await firebaseAdmin.createClient(generateClientData());
        setStatus(`Created client ${i + 1}/20`);
      }

      const userClientsCollection = collection(db, "Clients");
      const userClientsSnapshot = await getDocs(userClientsCollection);
      const userClientsIds = userClientsSnapshot.docs.map((doc) => doc.id);
      const userLawyerCollection = collection(db, "Lawyers");
      const userLawyerSnapshot = await getDocs(userLawyerCollection);
      const userLawyerIds = userLawyerSnapshot.docs.map((doc) => doc.id);

      // Generate 50 posts
      for (let i = 0; i < 50; i++) {
        const randomClientId =
          userClientsIds.length > 0
            ? userClientsIds[Math.floor(Math.random() * userClientsIds.length)]
            : undefined;

        const postData = generatePostData(randomClientId); // Get post data object
        const postId = await firebaseAdmin.createPost(postData); // Await post creation
        setStatus(`Created post ${i + 1}/50`);
      }

      // Generate some chatrooms and messages
      for (let i = 0; i < 15; i++) {
        const randomClientId =
          userClientsIds.length > 0
            ? userClientsIds[Math.floor(Math.random() * userClientsIds.length)]
            : undefined;
        const randomLawyerId =
          userLawyerIds.length > 0
            ? userLawyerIds[Math.floor(Math.random() * userLawyerIds.length)]
            : undefined;
        const participants = [randomClientId, randomLawyerId];

        const chatroomId = await firebaseAdmin.createChatroom(participants);

        // Add 1-10 messages to each chatroom
        const messageCount = Math.floor(Math.random() * 10) + 1;
        for (let j = 0; j < messageCount; j++) {
          await firebaseAdmin.sendMessage(
            chatroomId,
            participants[Math.floor(Math.random() * 2)],
            `Test message ${j + 1} in chatroom ${i + 1}`
          );
        }

        setStatus(`Created chatroom ${i + 1}/15 with ${messageCount} messages`);
      }

      setStatus("Test data generation complete!");
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Firebase Test Data Generator</h2>

      <button
        onClick={generateTestData}
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: loading ? "#cccccc" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: loading ? "not-allowed" : "pointer",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        {loading ? "Generating..." : "Generate Test Data"}
      </button>

      {status && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#f8f9fa",
            border: "1px solid #dee2e6",
            borderRadius: "4px",
          }}
        >
          {status}
        </div>
      )}
    </div>
  );
};

export default TestDataGenerator;
