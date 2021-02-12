import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { dbAddSong } from "../actions/LibraryActions";
import { ADD_SONG, LibraryActions, REMOVE_SONG } from "../interfaces/library/actions";
import {Song} from "../interfaces/tracks"
import { RootState } from "../reducer/rootReducer";

const SongComponent:React.FC<{song:Song}> = ({song})=>{
    
    const dispatch = useDispatch<Dispatch<LibraryActions>>();
    const user = useSelector((state:RootState)=>state.user.userInfo);


    const addSong = (e:React.MouseEvent) =>{
        e.preventDefault();
        dbAddSong(
            dispatch,
            user.userId,
            {
                songId:song.id,
                songTitle:song.name,
                artist:song.artists,
                image:song.image
            }
        )
        song.isSaved=!song.isSaved;
    }

    const removeSong = (e:React.MouseEvent) =>{
        e.preventDefault();
        dispatch({
            type:REMOVE_SONG,
            songId:song.id
        })
        song.isSaved=!song.isSaved;
    }

    return(
        <div className="search_item">
            <div className="result_song_image">
                <img width={song.image.width*0.5} src={song.image.url} height={song.image.height*0.5}/>
            </div>
            <p className="result_song_name result_text">{song.name}</p>
            <p className="result_song_albumName result_text">{song.albumName}</p>
            <p className="result_song_artists result_text">{song.artists}</p>
            <p className="result_song_duration result_text">{Math.round(song.duration/1000/60).toString()} min</p>
            {
                song.isSaved ? <button className="result_song_remove_button" onClick={(e:React.MouseEvent)=>removeSong(e)}>Remove</button> :
                <button className="result_song_add_button" onClick={(e:React.MouseEvent)=>addSong(e)}>Save</button>
            }
        </div>
    )

}

export default SongComponent;