import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {RootObject,Song} from '../interfaces/tracks'
import { RootState } from "../reducer/rootReducer";
import NewReleasesComponent from "./NewReleases";
import SongComponent from "./Song";

const Header:React.FC<{token:string}> = ({token}) =>{

    const [keyword,setKetWord] = useState('');
    const [songs,setSongs] = useState<Song[]>([]);
    const _songs = useSelector((state:RootState)=>state.library.songs);

    useEffect(() => {
        console.log(_songs);
    }, [_songs])



    const submitFromButton = (e:React.MouseEvent)=>{
        e.preventDefault();
        if(keyword !== '' && token!== ''){
            axios.get("https://api.spotify.com/v1/search",{
                headers:{
                    'Authorization':'Bearer '+token,
                },
                params:{
                    'q':keyword,
                    'type':'track',
                    'limit':10
                }
            }).then((ref)=>{
                const results:RootObject = ref.data;
                // const _songs:Song[] =[];
                const _songs:Song[] = results.tracks.items.map((item)=>{
                        return {
                        id:item.id,
                        albumName:item.album.name,
                        name:item.name,
                        artists:item.artists.map((artist)=>artist.name).join(','),
                        duration:item.duration_ms,
                        image:item.album.images[item.album.images.length-1],
                        isSaved:false
                    }
                })
                setSongs(_songs);
                console.log(_songs);
            }).catch((err)=>{
                alert("An error ocurred while retrieving data.\nError:"+err)
            })
        }        
    }
    
    return(
        <div>
            <div>
                <form>
                    <input onChange={(e)=>setKetWord(e.target.value)} placeholder="Write a song name"/>
                    <button onClick={(e:React.MouseEvent) => submitFromButton(e)}>Search</button>
                </form>
                <div>
                    <a href={"https://accounts.spotify.com/authorize?client_id=98b26aae37f3433da592324222e084a9&response_type=token&redirect_uri=http://localhost:3000"} >
                        <button>Login</button>
                    </a>
                </div>
            </div>
            <NewReleasesComponent token={token}/>
            {
                songs.map((_song)=><SongComponent key={_song.id} song={_song} />)
            }
        </div>
    )
}

export default Header;