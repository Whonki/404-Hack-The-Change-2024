import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile.jsx";
import LegalCasesFeed from "./pages/PostsFeed.jsx";
import ChatInterface from "./pages/ChatInterface.jsx";
import NavBar from "./components/NavBar.jsx";
import PostCase from "./pages/PostCase.jsx";
import { auth } from "./firebase.js"
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
        <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cases" element={<LegalCasesFeed currentUserId={auth.currentUser.uid} />} />
            <Route path="/chats" element={<ChatInterface />} />
            <Route path="/chat/:roomId" element={<ChatInterface />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/post-case" element={<PostCase />} />
          </Routes>
          </div>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
