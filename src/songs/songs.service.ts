import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Songs } from './song.entity';
import { CreateSongDTO } from './dto/create-song-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateSongDTO } from './dto/update-song-dto';

@Injectable({
    scope: Scope.TRANSIENT
})
export class SongsService {

    constructor(
        @InjectRepository(Songs)
        private songsRepository: Repository<Songs>) { }

    private readonly songs: any[] = [];


    async createSong(songDto: CreateSongDTO): Promise<Songs> {
        const song = new Songs();
        song.title = songDto.title;
        song.artists = songDto.artists;
        song.duration = songDto.duration;
        song.lyrics = songDto.lyrics;
        song.releasedData = songDto.releasedData;

        return await this.songsRepository.save(song)
    }

    findAllSongs(): Promise<Songs[]> {
        return this.songsRepository.find()
    }

    async findOneSong(id: number): Promise<Songs> {
        const song = await this.songsRepository.findOneBy({ id })
        if (!song) {
            throw new NotFoundException(`Song with ${id} not found`);
        }
        return song;
    }

    removeSong(id:number):Promise<DeleteResult>{
        return this.songsRepository.delete(id)
    }

    updateSong(id:number,recordToUpdate:UpdateSongDTO):Promise<UpdateResult>{
        return this.songsRepository.update(id,recordToUpdate)
    }
}

