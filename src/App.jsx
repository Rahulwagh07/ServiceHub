import { Outlet } from "react-router-dom";
import "./App.css"
import Navbar from "./components/common/Navbar"
import { useSelector } from "react-redux";

function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col">
        <Navbar/>
        <Outlet/> 
    </div>
  );
}

export default App;