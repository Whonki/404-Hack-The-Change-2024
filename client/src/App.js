import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cases from "./pages/Cases.jsx";
import Profile from "./pages/Profile.jsx";
import NavBar from "./components/NavBar.jsx";
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
            <Route path="/cases" element={<Cases />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          </div>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
