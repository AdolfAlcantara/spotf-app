import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "./components/Header";
import TopBar from "./components/TopBar";

function App() {

  const [token, setToken] = useState('');

  const history = useHistory();

  useEffect(() => {
    if(hash.length>1){
      hash.forEach((item)=>{
        if(item[0] === "access_token"){
          setToken(item[1]);
          return;
        }
      })
    }
    history.push('/');
  }, [])

  const removeToken = () =>{
    setToken("");
    history.push("/")
  }
  
  const hash:string[][] = window.location.hash
  .substring(1)
  .split("&").map((item)=>item.split("="));


  return (
    <div>
      <TopBar token={token} removeToken={removeToken} />
      {
        (token !== '') ? <Header token={token}/> :null
      }
      
    </div>
  );
}

export default App;
