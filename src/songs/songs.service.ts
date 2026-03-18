import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDTO } from './dto/create-song-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateSongDTO } from './dto/update-song-dto';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/artist.entity';
import { waitForDebugger } from 'inspector';

@Injectable({
    scope: Scope.TRANSIENT
})
export class SongsService {

    constructor(
        @InjectRepository(Song)
        private songsRepository: Repository<Song>,
        @InjectRepository(Artist)
        private artistRepository: Repository<Artist>
    ) { }


    private readonly songs: any[] = [];


    async createSong(songDto: CreateSongDTO): Promise<Song> {
        const song = new Song();
        song.title = songDto.title;
        // song.artists = songDto.artists;
        song.duration = songDto.duration;
        song.lyrics = songDto.lyrics;
        song.releasedDate = songDto.releasedDate;

        // find all the artists on the based on id 
        const artists = await this.artistRepository.findByIds(songDto.artists)

        // set the relationship with artist and songs
        song.artists = artists

        return await this.songsRepository.save(song)
    }

    findAllSongs(): Promise<Song[]> {
        return this.songsRepository.find()
    }

    async findOneSong(id: number): Promise<Song> {
        const song = await this.songsRepository.findOneBy({ id })
        if (!song) {
            throw new NotFoundException(`Song with ${id} not found`);
        }
        return song;
    }

    removeSong(id: number): Promise<DeleteResult> {
        return this.songsRepository.delete(id)
    }

    async updateSong(id: number, recordToUpdate: UpdateSongDTO): Promise<Song> {
        const song = await this.findOneSong(id);

        if (recordToUpdate.title !== undefined) song.title = recordToUpdate.title;
        if (recordToUpdate.duration !== undefined) song.duration = recordToUpdate.duration;
        if (recordToUpdate.lyrics !== undefined) song.lyrics = recordToUpdate.lyrics;
        if (recordToUpdate.releasedDate !== undefined) song.releasedDate = recordToUpdate.releasedDate;

        if (recordToUpdate.artists != undefined) {
            const artistIds = recordToUpdate.artists.map(Number)
            const artists = await this.artistRepository.findBy({ id: In(artistIds) });
            song.artists = artists
        }
        return this.songsRepository.save(song)
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
        const queryBuilder = this.songsRepository.createQueryBuilder("c");
        queryBuilder.orderBy("c.releasedDate", "DESC");
        return paginate<Song>(queryBuilder, options);
    }
}