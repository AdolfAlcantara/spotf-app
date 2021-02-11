import { useDispatch, useSelector } from "react-redux";
import {RootState} from "../../reducer/rootReducer";
import SongList from "./SongList";
import {Link} from "react-router-dom";
import { useEffect } from "react";
import { Dispatch } from "redux";
import { LibraryActions } from "../../interfaces/library/actions";
import { dbSetSongs } from "../../actions/LibraryActions";
import { Song } from "../../interfaces/library/models";

interface combinedReducers{
    songs:Song[],
    userId:string
}

const LibraryComponent = () =>{
    
    const {songs,userId} = useSelector<RootState,combinedReducers>((state)=>({
                                songs:state.library.songs,
                                userId:state.user.userInfo.userId
                            }));
    const dispatch = useDispatch<Dispatch<LibraryActions>>();

    useEffect(() => {
        dbSetSongs(dispatch,userId)
        
    }, [])

    return(
        <>
            <h1>My library</h1>
            <div>
                <Link to={'/'}>
                    <button>Search</button>
                </Link>
            </div>
            <SongList songs={songs}/>
        </>
    )
    
}

export default LibraryComponent;