import axios from "axios";
import { useEffect, useState } from "react";
import { AlbumTracks, NewAlbumSong } from "../interfaces/albumTracks";
import { Song } from "../interfaces/library/models";
import {NewReleases, Image as AlbumImage} from '../interfaces/newAlbums';
import NewRelease from './NewRelease';


const NewReleasesComponent:React.FC<{token:string,librarySongs:Song[]}> = ({token,librarySongs}) =>{

    const [songs,setSongs] = useState<NewAlbumSong[]>([]);


    useEffect(() => {
        if(token !== ''){
            const newSongs: NewAlbumSong[] = [];
            axios.get<NewReleases>("https://api.spotify.com/v1/browse/new-releases",{
                headers:{
                    'Authorization': 'Bearer '+token
                },
                params:{
                    'limit':5
                }
            }).then(({ data })=>{
                console.log('then start')
                const newReleases = data;
                const newAlbums = newReleases.albums.items.map((a) => ({ id: a.id, image: a.images[a.images.length-1] }));
                console.log('bf newSongs')
                getNewSongs(newAlbums).then(allNewSongs => {
                    setSongs(allNewSongs)
                }).catch(() => {
                    ///TODO define errors
                    setSongs([]);
                });
            }).catch((err)=>{
                ///TODO define errors
                alert(err);
            })
        }
    }, [token])

    const getNewSongs = (albums: {id: string, image: AlbumImage}[]): Promise<NewAlbumSong[]> =>{
        return Promise.all(
            albums.map(async (album)=>{
                    return axios.get<AlbumTracks>(`https://api.spotify.com/v1/albums/${album.id}/tracks`,{
                        headers:{
                            'Authorization': 'Bearer '+token
                        },
                        params:{
                            'limit':1
                        }
                    }).then(({ data })=>{
                        const _newSongs = data;
                        return {
                            songId: _newSongs.items[0].id,
                            songName: _newSongs.items[0].name,
                            artists: _newSongs.items[0].artists.map((a)=>a.name).join(''),
                            image: album.image,
                            isSaved: librarySongs.find(x=>x.songId===_newSongs.items[0].id) !== undefined
                        }
                    })
            })
        )
    }


    return(
        <div>
            {
                songs.map((_song:NewAlbumSong)=><NewRelease key={_song.songId} song={_song}/>)
            }
        </div>
    )
}

export default NewReleasesComponent;