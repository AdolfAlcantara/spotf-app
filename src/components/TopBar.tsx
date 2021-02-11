import axios from "axios"
import { useEffect, useState } from "react"
import { LoggedUserInfo, UserInfo } from "../interfaces/userInfo"
import {Link} from 'react-router-dom';


const TopBar:React.FC<{token:string,removeToken():void}> = ({token, removeToken}) =>{

    const [userInfo, setUserInfo] = useState<LoggedUserInfo>({display_name:'',url_image:''});


    useEffect(() => {
        if(token !== ""){
            axios.get<UserInfo>("https://api.spotify.com/v1/me",{
                headers:{
                    "Authorization": "Bearer "+token
                }
            }).then(({data})=>{
                const userInfo = data;
                console.log(userInfo);
                setUserInfo({
                    display_name:userInfo.display_name,
                    url_image:userInfo.images[0].url
                })
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
                    <img src={userInfo.url_image} width="5%" height="5%"/>
                    <p>{userInfo.display_name}</p>
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