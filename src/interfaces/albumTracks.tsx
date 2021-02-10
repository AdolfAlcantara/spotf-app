import {Image} from "./newAlbums";

export interface ExternalUrls {
    spotify: string;
}

export interface Artist {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export interface ExternalUrls2 {
    spotify: string;
}

export interface Item {
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: ExternalUrls2;
    href: string;
    id: string;
    name: string;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}

export interface AlbumTracks {
    href: string;
    items: Item[];
    limit: number;
    next: string;
    offset: number;
    previous?: any;
    total: number;
}

export interface NewAlbumSong{
    image:Image,
    songName:string,
    artists:string,
    songId:string,
    isSaved:boolean
}
