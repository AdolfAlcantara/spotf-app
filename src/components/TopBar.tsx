import axios from "axios"
import { useEffect, useState } from "react"
import { UserInfo } from "../interfaces/userInfo"
import {Link, useHistory} from 'react-router-dom';
import { LoggedUserInfo } from "../interfaces/user/models";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducer/rootReducer";
import { Dispatch } from "redux";
import { UserActions } from "../interfaces/user/actions";
import { SetToken, SetUserInfo } from "../actions/UserActions";
import userUnknown from "../images/unknown_user.png";
import { LibraryActions } from "../interfaces/library/actions";
import { dbSetSongs } from "../actions/LibraryActions";


const TopBar:React.FC = () =>{

    const {token,userInfo} = useSelector((state:RootState)=>state.user);
    // const userData = useSelector((state:RootState)=>state.user);
    const dispatch = useDispatch<Dispatch<UserActions|LibraryActions>>();
    const history = useHistory();

    const clientId = process.env.REACT_APP_CLIENT_ID;
    const returnUrl = process.env.REACT_APP_RETURN_URL;
    
    const hash:string[][] = window.location.hash
    .substring(1)
    .split("&").map((item)=>item.split("="));
  

    useEffect(() => {
        if(hash.length>1){
          hash.forEach((item)=>{
            if(item[0] === "access_token"){
              // setToken(item[1]);
              dispatch(SetToken(item[1]));
              return;
            }
          })
        }
        history.push('/');
      }, [])

    useEffect(() => {
        if(token !== ""){
            axios.get<UserInfo>("https://api.spotify.com/v1/me",{
                headers:{
                    "Authorization": "Bearer "+token
                }
            }).then(({data})=>{
                const userInfo = data;
                const re = /[._!$#-+]/g;
                let userId = userInfo.id;
                const allMatches = userId.match(re);
                if(allMatches){
                    const matches = new Set(allMatches)
                    matches.forEach((match)=>{
                        userId = userId.replace(RegExp(`[${match}]`,'g'),match.charCodeAt(0).toString())
                    })
                }
                dispatch(
                    SetUserInfo({
                        display_name:userInfo.display_name,
                        url_image:userInfo.images.length>0?userInfo.images[0].url:userUnknown,
                        userId:userId,
                    })
                )
                dbSetSongs(dispatch,userId);
            }).catch((err)=>{
                //TODO define error messages
                alert(err);
            })
        }
    }, [token])

    const removeToken = () =>{
        // setToken("");
        dispatch(SetToken(''));
        history.push("/")
      }

    const returnProfile = () =>{
        if(token!==''){
            return(
                <div className="logged_bar">
                    <div className="user_info">
                        <img
                            className="profile_pic" 
                            src={userInfo.url_image} 
                            // width="5%" 
                            // height="5%"
                        />
                        <p className="user_name">{userInfo.display_name}</p>
                    </div>
                    <div className="action_buttons_container">
                        <div className="nav_buttons">
                            <Link to={'/library'}>
                                <button className="rounded_green_button">Library</button>
                            </Link>
                            <Link to={'/'}>
                                <button className="rounded_green_button">Search</button>
                            </Link>
                        </div>
                        <div className="logout_button">
                            <button className="rounded_green_button" onClick={removeToken} >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="login_bar">
                    <a href={`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${returnUrl}`} >
                        <button className="rounded_green_button">    
                            <span className="button_span">Login</span>
                        </button>
                    </a>
                </div>  
            )
        }
    }


    return returnProfile();
}

export default TopBar;