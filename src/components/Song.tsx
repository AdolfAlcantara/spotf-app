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
        <div>
            <img width={song.image.width} src={song.image.url} height={song.image.height}/>
            <p>{song.name}</p>
            <p>{song.albumName}</p>
            <p>{song.artists}</p>
            <p>{song.duration/1000/60}</p>
            {
                song.isSaved ? <button onClick={(e:React.MouseEvent)=>removeSong(e)}>Remove</button> :
                <button onClick={(e:React.MouseEvent)=>addSong(e)}>Save</button>
            }
        </div>
    )

}

export default SongComponent;