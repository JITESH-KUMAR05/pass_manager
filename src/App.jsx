import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="w-100vw h-100vh">
        <Navbar></Navbar>
        <div className=" -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] min-h-[81.5vh]">
          <Manager />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
