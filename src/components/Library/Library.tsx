import { useDispatch, useSelector } from "react-redux";
import {RootState} from "../../reducer/rootReducer";
import SongList from "./SongList";
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";
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
        if(userId !== '' && songs.length==0){
            dbSetSongs(dispatch,userId);
        }
    }, [])

    const isUserLogged = () =>{
        if(userId !== ''){
            return(
                <>
                    {/* <div>
                        <Link to={'/'}>
                            <button>Search</button>
                        </Link>
                    </div> */}
                    <SongList songs={songs}/>
                </>
            )
        }else{
            return(<span>Please logging to start creating your library</span>);
        }
    }
    

    return(
        <>
            <h1 className="library_header">My library</h1>
            <div>
                {isUserLogged()}
            </div>
        </>
    )
    
}

export default LibraryComponent;