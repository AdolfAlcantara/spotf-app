import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { NewAlbumSong } from "../interfaces/albumTracks"
import { ADD_SONG, LibraryActions, REMOVE_SONG } from "../interfaces/library/actions";

const NewRelease:React.FC<{song:NewAlbumSong}> = ({song}) =>{

    const dispatch = useDispatch<Dispatch<LibraryActions>>();

    const addSong = (e:React.MouseEvent) =>{
        e.preventDefault();
        dispatch({
            type:ADD_SONG,
            song:{
                songId:song.songId,
                songTitle:song.songName,
                artist:song.artists,
                image:song.image
            }
        })
        song.isSaved=!song.isSaved;
    }

    const removeSong = (e:React.MouseEvent) =>{
        e.preventDefault();
        dispatch({
            type:REMOVE_SONG,
            songId:song.songId
        })
        song.isSaved=!song.isSaved;
    }


    return(
        <div>
            <img src={song.image.url} width={song.image.width} height={song.image.height}/>
            <h1>{song.songName}</h1>
            {
                song.isSaved ? <button onClick={(e)=>removeSong(e)}>Remove from library</button> :
                <button onClick={(e)=>addSong(e)}>Add to library</button>
            }
        </div>
    )
}

export default NewRelease;