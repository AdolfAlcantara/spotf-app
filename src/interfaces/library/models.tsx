import { Image } from "../tracks";

export interface Song{
    image:Image,
    artist:string,
    songId:string
    songTitle:string
}

export interface LibraryState{
    songs:Song[]
}