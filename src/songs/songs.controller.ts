import { Body, Controller, DefaultValuePipe, Delete, Get, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Query, Scope } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import type { Connection } from 'src/common/constants/connection';
import { Song } from './song.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDTO } from './dto/update-song-dto';
import { Pagination } from 'nestjs-typeorm-paginate';

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
    findAllSongs(
        @Query("page", new DefaultValuePipe(1), ParseIntPipe)
        page: number = 1,
        @Query("limit", new DefaultValuePipe(10), ParseIntPipe)
        limit: number = 10
    ): Promise<Pagination<Song>> {
        limit = limit > 100 ? 100 : limit;
        return this.songsService.paginate({
            page,
            limit
        })
    }

    // find song by id
    @Get(":id")
    findOneSong(@Param("id", new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<Song> {
        return this.songsService.findOneSong(id);
    }

    @Post()
    addSong(@Body() CreateSongDTO: CreateSongDTO): Promise<Song> {
        return this.songsService.createSong(CreateSongDTO)
    }

    @Put(":id")
    updateSong(
        @Body() songToUpdate: UpdateSongDTO,
        @Param("id", ParseIntPipe) id: number): Promise<Song> {
        return this.songsService.updateSong(id, songToUpdate)
    }

    @Delete(":id")
    deleteSong(@Param("id", ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.songsService.removeSong(id)
    }
}
















