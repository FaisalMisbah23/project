import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Scope } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import type { Connection } from 'src/common/constants/connection';
import { Songs } from './song.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDTO } from './dto/update-song-dto';

@Controller({
    path: 'songs',
    scope: Scope.REQUEST
})
export class SongsController {
    constructor(private songsService: SongsService, @Inject("CONNECTION") private connection: Connection,) {
        console.log(`This is the connection string: ${this.connection.CONNECTION_STRING}`)
    }
    // get all songs 
    @Get()
    findAllSongs(): Promise<Songs[]> {
        return this.songsService.findAllSongs()
    }

    // find song by id
    @Get(":id")
    findOneSong(@Param("id", new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<Songs> {
        return this.songsService.findOneSong(id);
    }

    @Post()
    addSong(@Body() CreateSongDTO: CreateSongDTO): Promise<Songs> {
        return this.songsService.createSong(CreateSongDTO)
    }

    @Put(":id")
    updateSong(
        @Body() songToUpdate: UpdateSongDTO,
        @Param("id", ParseIntPipe) id: number): Promise<UpdateResult> {
        return this.songsService.updateSong(id, songToUpdate)
    }

    @Delete(":id")
    deleteSong(@Param("id", ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.songsService.removeSong(id)
    }
}
















