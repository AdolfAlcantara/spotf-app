import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { LibraryActions, REMOVE_SONG } from "../../interfaces/library/actions";
import { Song as SongModel} from "../../interfaces/library/models";


const Song:React.FC<{song:SongModel}> = ({song}) =>{

    const dispatch = useDispatch<Dispatch<LibraryActions>>();

    const remove = (e:React.MouseEvent)=>{
        e.preventDefault();
        dispatch({
            type:REMOVE_SONG,
            songId:song.songId
        })
    }

    return(
        <div>
            <img src={song.image.url} 
                width={song.image.width}
                height={song.image.height}/>
            <p>{song.songTitle}</p>
            <p>{song.artist}</p>
            <button onClick={(e)=>remove(e)}>Remove from library</button>
        </div>
    )
}

export default Song;