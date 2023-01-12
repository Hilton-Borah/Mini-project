
import { useEffect } from "react";
import "./App.css";
import AllRoutes from "./Components/All Routes/AllRoutes";
import Navbar from "./Components/Navbar/Navbar";
import axios from "axios"

function App() {
//   useEffect(()=>{
//     axios.get("http://localhost:8050/mini")
//     .then((res)=>{
//         console.log(res)
//     }).catch((err)=>{
//         console.log(err)
//     })
// },[])
  return (
    <div className="App">
    <Navbar />
    <AllRoutes />
    
    </div>
  );
}

export default App;
