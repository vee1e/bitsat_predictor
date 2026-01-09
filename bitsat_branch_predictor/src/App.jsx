// import './App.css'
import { Routes, Route } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import About from "./About.jsx";
import Home from "./Home.jsx";


function Working() {
	return (
		<div className="mt-20 text-center text-xl"> </div>
  	);
}

function App() {
  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-violet-950 to-violet-700">
      <Header></Header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/working" element={<Working />}> </Route>
        <Route path="/home" element={<Home/>}></Route>
      </Routes>

      <Footer></Footer>

    </div>

    </>
  );
}

export default App
