import { Outlet } from "react-router-dom";
import "./App.css"
import Navbar from "./components/common/Navbar"
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation()
  
  return (
    <div className="flex min-h-screen w-screen flex-col">
      { location.pathname === "/" ? "" : <Navbar/>}
      <Outlet/> 
    </div>
  );
}

export default App;