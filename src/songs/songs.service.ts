import { Injectable, Scope } from '@nestjs/common';

@Injectable({
    scope:Scope.TRANSIENT
})
export class SongsService {

    // local db 
    // local array

    private readonly songs:any[] = [];

    createSong(song:any) {
        this.songs.push(song);
        return this.songs
    }

    findAllSongs() {
        return this.songs
    }
}
