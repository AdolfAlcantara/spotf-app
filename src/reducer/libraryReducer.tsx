import { LibraryState } from "../interfaces/library/models";
import {ADD_SONG, LibraryActions, REMOVE_SONG} from "../interfaces/library/actions";


const LibraryInitialState:LibraryState = {
    songs:[]
}

const LibraryReducer = (state = LibraryInitialState, action:LibraryActions):LibraryState =>{
    switch (action.type) {
        case ADD_SONG:
            return {songs:[...state.songs,action.song]}
        case REMOVE_SONG:
            return {songs:state.songs.filter(x=>x.songId!==action.songId)};
        case "SET_SONGS":
            return {songs:action.songs}
        default:
            return state;
    }
}

export default LibraryReducer;