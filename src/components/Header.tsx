import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {RootObject,Song} from '../interfaces/tracks'
import { RootState } from "../reducer/rootReducer";
import NewReleasesComponent from "./NewReleases";
import SongComponent from "./Song";
import {Link} from "react-router-dom";

const Header:React.FC = () =>{

    const [keyword,setKetWord] = useState('');
    const [songs,setSongs] = useState<Song[]>([]);
    const {token,librarySongs} = useSelector((state:RootState)=>({token:state.user.token,librarySongs:state.library.songs}));


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
                        isSaved:librarySongs.find(x=>x.songId===item.id) !== undefined
                    }
                })
                setSongs(_songs);
                console.log(_songs);
            }).catch((err)=>{
                alert("An error ocurred while retrieving data.\nError:"+err)
            })
        }        
    }


    const mainPageLayout = () =>{
        if(token===''){
            return(<div>
                Login to enjoy music
            </div>)
        }else{
            return(
                <div>
                    <div>
                        <form>
                            <input onChange={(e)=>setKetWord(e.target.value)} placeholder="Write a song name"/>
                            <button onClick={(e:React.MouseEvent) => submitFromButton(e)}>Search</button>
                        </form>
                        <div>
                            <Link to={'/library'}>
                                <button>Library</button>
                            </Link>
                        </div>
                    </div>
                    <NewReleasesComponent token={token} librarySongs={librarySongs}/>
                    {
                        songs.map((_song)=><SongComponent key={_song.id} song={_song} />)
                    }
                </div>
            )
        }
    }

    
    return mainPageLayout();
}

export default Header;