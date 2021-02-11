import { useSelector } from "react-redux";
import {RootState} from "../../reducer/rootReducer";
import SongList from "./SongList";
import {Link} from "react-router-dom";

const LibraryComponent = () =>{
    
    const songs = useSelector((state:RootState)=>state.library.songs);

    console.log(songs);

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