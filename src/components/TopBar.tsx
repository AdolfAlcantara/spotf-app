import axios from "axios"
import { useEffect, useState } from "react"
import { UserInfo } from "../interfaces/userInfo"
import {Link} from 'react-router-dom';
import { LoggedUserInfo } from "../interfaces/user/models";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducer/rootReducer";
import { Dispatch } from "redux";
import { UserActions } from "../interfaces/user/actions";
import { SetUserInfo } from "../actions/UserActions";
import userUnknown from "../images/unknown_user.png";


const TopBar:React.FC<{token:string,removeToken():void}> = ({token, removeToken}) =>{

    const userData = useSelector((state:RootState)=>state.user);
    const dispatch = useDispatch<Dispatch<UserActions>>();


    useEffect(() => {
        if(token !== ""){
            axios.get<UserInfo>("https://api.spotify.com/v1/me",{
                headers:{
                    "Authorization": "Bearer "+token
                }
            }).then(({data})=>{
                const userInfo = data;
                console.log(userInfo);
                dispatch(
                    SetUserInfo({
                        display_name:userInfo.display_name,
                        url_image:userInfo.images[0].url,
                        userId:userInfo.id,
                    })
                )
            }).catch((err)=>{
                //TODO define error messages
                alert(err);
            })
        }
    }, [token])

    const returnProfile = () =>{
        if(token!==''){
            return(
                <div>
                    <img 
                        src={userData.userInfo.url_image!==''?userData.userInfo.url_image:userUnknown} 
                        width="5%" 
                        height="5%"
                    />
                    <p>{userData.userInfo.display_name}</p>
                    <button onClick={removeToken}>Logout</button>
                </div>
            )
        }else{
            return(
                <div>
                    <a href={"https://accounts.spotify.com/authorize?client_id=98b26aae37f3433da592324222e084a9&response_type=token&redirect_uri=http://localhost:3000"} >
                        <button>Login</button>
                    </a>
                </div>  
            )
        }
    }


    return(
        <>
            {
                returnProfile()
            }
        </>
    )
}

export default TopBar;