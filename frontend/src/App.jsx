 import{Routes,Route,Link} from "react-router-dom"
 import Dashboard from "./pages/Dashboard"
 import Send from "./pages/Send"
 import Signin from "./pages/Signin"
 import Signup from "./pages/Signup"  
 import Validation from "./pages/Validation" 
 import LoadingIcon from './pages/LoadingIcon'
 import './index.css'
import { useEffect, useState } from "react"
import TransferStatus from "./pages/TransferStatus"
function App() {
 
 useEffect(() => {
    // Define the function to perform the click
    const performClick = () => {
      const element = document.getElementById("root");
      if (element) {
        element.click();
        console.log("Clicked on the root element to keep the app active");
      } else {
        console.warn("Target element not found");
      }
    };

    // Set interval to perform the click every 5 minutes (300000 ms)
    const intervalId = setInterval(() => {
      performClick();
    }, 300000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
 
  return (
    <>
     
      <Routes>
        
        <Route path="/loading" element={<LoadingIcon/>}/>
        <Route path="/status" element={<TransferStatus/>}> </Route>
        <Route path="/dashboard" element={<Dashboard/>}> </Route>
        <Route path="/" element={<Validation/>}></Route>
        <Route path="/signup" element={<Signup/>}> </Route>
        <Route path="/signin" element={<Signin/>}> </Route>
        <Route path="/send" element={<Send/>}> </Route>
      </Routes>
    </>
  )
}

export default App
