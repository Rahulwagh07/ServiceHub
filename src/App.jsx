import { Outlet } from "react-router-dom";
import "./App.css"
import Navbar from "./components/common/Navbar"
import { useSelector } from "react-redux";

function App() {
  const {token} = useSelector((state) => state.auth)
  
  return (
    <div className="flex min-h-screen w-screen flex-col dark:bg-slate-900 dark:text-slate-400">
        <Navbar/>
        <p>Token `{token}`</p>
        <Outlet/> 
    </div>
  );
}

export default App;