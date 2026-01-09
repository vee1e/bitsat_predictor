// import './App.css'
import { Routes, Route } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import About from "./About.jsx";
import Home from "./Home.jsx";
import Working from "./Working.jsx"


function App() {
  return (
    <>
    <div className="min-h-screen bg-gray-950">
      <Header></Header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/working" element={<Working />}> </Route>
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home/>}></Route>
      </Routes>

      <Footer></Footer>

    </div>

    </>
  );
}

export default App
