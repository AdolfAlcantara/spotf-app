import { Song } from "./models";

export const ADD_SONG = "ADD_SONG";
export const REMOVE_SONG = "REMOVE_SONG";
export const SET_SONGS = "SET_SONGS";

interface AddSong {
    type:typeof ADD_SONG
    song:Song
}

interface RemoveSong{
    type: typeof REMOVE_SONG
    songId:string
}

interface SetSongs{
    type: typeof SET_SONGS
    songs:Song[]
}

export type LibraryActions = AddSong | RemoveSong | SetSongs;