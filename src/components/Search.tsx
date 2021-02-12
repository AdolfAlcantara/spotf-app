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
                        image:item.album.images[1],
                        isSaved:librarySongs.find(x=>x.songId===item.id) !== undefined
                    }
                })
                setSongs(_songs);
            }).catch((err)=>{
                alert("An error ocurred while retrieving data.\nError:"+err)
            })
        }        
    }


    const mainPageLayout = () =>{
        if(token===''){
            return(
            <div className="search_component_container">
                <span>Login to enjoy music</span>
            </div>)
        }else{
            return(
                <div className="search_component_container">
                    <div style={{display:"flex"}}>
                        <div style={{flexGrow:1}}></div>
                        <form className="search_form_container">
                            <input className="input_search" onChange={(e)=>setKetWord(e.target.value)} placeholder="Write a song name"/>
                            <button className="search_button" onClick={(e:React.MouseEvent) => submitFromButton(e)}>Search</button>
                        </form>
                        <div style={{flexGrow:1}}></div>
                    </div>
                    <NewReleasesComponent token={token} librarySongs={librarySongs}/>
                    <div className="search_results">
                    {
                        songs.map((_song)=><SongComponent key={_song.id} song={_song} />)
                    }
                    </div>
                </div>
            )
        }
    }

    
    return mainPageLayout();
}

export default Header;