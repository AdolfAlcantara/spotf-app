import { ADD_SONG, LibraryActions, REMOVE_SONG, SET_SONGS } from "../interfaces/library/actions";
import { Song } from "../interfaces/library/models";
import database from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducer/rootReducer";
import { Dispatch } from "redux";


export const AddSong = (song:Song):LibraryActions =>({
    type: ADD_SONG,
    song
})

export const RemoveSong = (songId:string):LibraryActions =>({
    type:REMOVE_SONG,
    songId
})

export const SetSongs = (songs:Song[]):LibraryActions =>({
    type:SET_SONGS,
    songs
})

export const dbAddSong = (dispatch:Dispatch<LibraryActions>,userId:string, song:Song) =>{
    database.ref(`libraries/${userId}/${song.songId}`)
        .push(song)
        .then((ref)=>{
            dispatch(AddSong(song));
        });
}

export const dbRemoveSong = (dispatch:Dispatch<LibraryActions>,userId:string, songId:string) =>{
    database.ref(`libraries/${userId}/${songId}`)
        .remove()
        .then(()=>{
            dispatch(RemoveSong(songId));
        });
}

export const dbSetSongs = (dispatch:Dispatch<LibraryActions>,userId:string) =>{
    database.ref(`libraries/${userId}`)
        .once('value')
        .then((snapshot)=>{
            const songs:Song[] = []
           snapshot.forEach((child1)=>{
               child1.forEach((child2)=>{
                   songs.push(child2.val());
               })
           });
           dispatch(SetSongs(songs));
        }).catch((err)=>{
            ///TODO define errors
            alert(err);
        })
}