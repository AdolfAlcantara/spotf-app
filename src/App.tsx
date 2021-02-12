import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { SetToken } from "./actions/UserActions";
import Search from "./components/Search";
import TopBar from "./components/TopBar";
import { UserActions } from "./interfaces/user/actions";
import { RootState } from "./reducer/rootReducer";

const App = () =>{

  // const [token, setToken] = useState('');
  const token = useSelector((state:RootState)=>state.user.token);
  // const dispatch = useDispatch<Dispatch<UserActions>>();

  // const history = useHistory();

  // useEffect(() => {
  //   if(hash.length>1){
  //     hash.forEach((item)=>{
  //       if(item[0] === "access_token"){
  //         // setToken(item[1]);
  //         dispatch(SetToken(item[1]));
  //         return;
  //       }
  //     })
  //   }
  //   history.push('/');
  // }, [])

  // const removeToken = () =>{
  //   // setToken("");
  //   dispatch(SetToken(''));
  //   history.push("/")
  // }
  
  // const hash:string[][] = window.location.hash
  // .substring(1)
  // .split("&").map((item)=>item.split("="));


  return (
    <div>
      {
        (token !== '') ? <Search/> :null
      }
    </div>
  );
}

export default App;
