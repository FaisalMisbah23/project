import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Scope } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import type { Connection } from 'src/common/constants/connection';

@Controller({
    path:'songs',
    scope:Scope.REQUEST    
})
export class SongsController {
    constructor(private songsService: SongsService, @Inject("CONNECTION") private connection: Connection,) {
        console.log(`This is the connection string: ${this.connection.CONNECTION_STRING}`)
    }
    // get all songs 
    @Get()
    findAllSongs() {
        return this.songsService.findAllSongs()
    }

    // find song by id
    @Get(":id")
    findOneSong(@Param("id", new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) {
        return `song by ${id}, typ: ${typeof id}`
    }

    @Post()
    addSong(@Body() CreateSongDTO: CreateSongDTO) {
        return this.songsService.createSong(CreateSongDTO)
    }

    @Put(":id")
    updateSong() {
        return "song updated successfully"
    }

    @Delete(":id")
    deleteSong() {
        return "song deleted successfully"
    }
}
















