import { Song } from "../../interfaces/library/models";
import {default as SingleSong} from "./Song" 

const SongList:React.FC<{songs:Song[]}> = ({songs}) =>{

    return(
        <div className="library_container">
            {
                songs.map((song)=>{
                   return <SingleSong key={song.songId} song={song}/>
                })
            }
        </div>
    )
}

export default SongList;