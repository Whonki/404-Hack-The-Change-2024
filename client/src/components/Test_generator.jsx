import React, { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
const TestDataGenerator = ({ firebaseAdmin }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const names = [
    "Liam",
    "Emma",
    "Noah",
    "Olivia",
    "Ava",
    "Sophia",
    "William",
    "James",
    "Isabella",
    "Benjamin",
    "Charlotte",
    "Lucas",
    "Amelia",
    "Henry",
    "Evelyn",
    "Alexander",
    "Mia",
    "Elijah",
    "Harper",
    "Sebastian",
    "Ella",
    "Jackson",
    "Scarlett",
    "Mason",
    "Aria",
    "Logan",
    "Luna",
    "Ethan",
    "Chloe",
    "Michael",
    "Mila",
    "Daniel",
    "Layla",
    "Matthew",
    "Lily",
    "Aiden",
    "Avery",
    "Joseph",
    "Grace",
    "Samuel",
    "Ellie",
    "David",
    "Zoey",
    "Carter",
    "Nora",
    "Owen",
    "Hazel",
    "Wyatt",
    "Riley",
    "John",
  ];

  const phoneNumbers = [
    "(201) 555-0123",
    "(202) 555-0198",
    "(203) 555-0176",
    "(204) 555-0134",
    "(205) 555-0192",
    "(206) 555-0155",
    "(207) 555-0179",
    "(208) 555-0147",
    "(209) 555-0163",
    "(210) 555-0185",
    "(212) 555-0151",
    "(213) 555-0189",
    "(214) 555-0138",
    "(215) 555-0129",
    "(216) 555-0193",
    "(217) 555-0170",
    "(218) 555-0183",
    "(219) 555-0159",
    "(220) 555-0164",
    "(221) 555-0188",
    "(222) 555-0145",
    "(223) 555-0197",
    "(224) 555-0136",
    "(225) 555-0161",
    "(226) 555-0181",
    "(227) 555-0127",
    "(228) 555-0153",
    "(229) 555-0173",
    "(230) 555-0167",
    "(231) 555-0141",
    "(232) 555-0194",
    "(233) 555-0171",
    "(234) 555-0152",
    "(235) 555-0139",
    "(236) 555-0184",
    "(237) 555-0162",
    "(238) 555-0146",
    "(239) 555-0157",
    "(240) 555-0177",
    "(241) 555-0195",
    "(242) 555-0131",
    "(243) 555-0187",
    "(244) 555-0148",
    "(245) 555-0168",
    "(246) 555-0124",
    "(247) 555-0190",
    "(248) 555-0175",
    "(249) 555-0132",
    "(250) 555-0154",
    "(251) 555-0186",
  ];

  const random_profilepic_url = "https://i.pravatar.cc/300";

  const generateLawyerData = (
    random_name = names[Math.floor(Math.random() * names.length)],
    random_phonenum = phoneNumbers[
      Math.floor(Math.random() * phoneNumbers.length)
    ]
  ) => ({
    Name: random_name,
    Email: random_name,
    Password: `Pass${Math.floor(Math.random() * 1000)}`,
    Phone: random_phonenum,
    ProfilePic: random_profilepic_url,
    Tags: ["experienced", "professional", "responsive"],
    Specializations: [
      "Corporate Law",
      "Family Law",
      "Criminal Law",
      "Civil Law",
    ].slice(0, Math.floor(Math.random() * 3) + 1),
    Languages: [
        "English",
        "French",
        "Tagalog",
        "Spanish",
        "Japanese",
        "Korean",
        "Italian"
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

  const generateClientData = (
    random_name = names[Math.floor(Math.random() * names.length)],
    random_phonenum = phoneNumbers[
      Math.floor(Math.random() * phoneNumbers.length)
    ]
  ) => ({
    Name: random_name,
    Email: random_name,
    Password: `Pass${Math.floor(Math.random() * 1000)}`,
    ProfilePic: "https://i.pravatar.cc/300",
    Phone: random_phonenum,
    Tags: ["active", "verified"],
    Languages: [
      "English",
      "French",
      "Tagalog",
      "Spanish",
      "Japanese",
      "Korean",
      "Italian"
  ].slice(0, Math.floor(Math.random() * 3) + 1),
  });

  const generatePostData = (randomClientId) => ({
    Title: `Legal Question ${Math.floor(Math.random() * 1000)}`,
    Content: `This is a test legal question about ${
      ["corporate", "family", "criminal", "civil"][
        Math.floor(Math.random() * 4)
      ]
    } law.`,
    UserId: randomClientId,
    Languages: postMessage.Languages,
    Status: ["active", "resolved", "pending"][Math.floor(Math.random() * 3)],
    Visibility: "public",
    Tags: ["urgent", "consultation", "advice"].slice(
      0,
      Math.floor(Math.random() * 3) + 1
    )
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
