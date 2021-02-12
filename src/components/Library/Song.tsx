import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { dbRemoveSong } from "../../actions/LibraryActions";
import { LibraryActions, REMOVE_SONG } from "../../interfaces/library/actions";
import { Song as SongModel} from "../../interfaces/library/models";
import { RootState } from "../../reducer/rootReducer";


const Song:React.FC<{song:SongModel}> = ({song}) =>{

    const dispatch = useDispatch<Dispatch<LibraryActions>>();
    const user = useSelector((state:RootState)=>state.user.userInfo);

    const remove = (e:React.MouseEvent)=>{
        e.preventDefault();
        dbRemoveSong(dispatch,user.userId,song.songId);
    }

    return(
        <div className="library_item">
            <img src={song.image.url} 
                width={song.image.width}
                height={song.image.height}/>
            <p className="library_songs_name">{song.songTitle}</p>
            <p className="library_songs_artists">{song.artist}</p>
            <button className="rounded_green_button" onClick={(e)=>remove(e)}>Remove from library</button>
        </div>
    )
}

export default Song;