import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { Repository } from 'typeorm';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import { CreatePlaylistDTO } from './dto/create-playlist-dto';

@Injectable()
export class PlaylistsService {
    constructor(
        @InjectRepository(Playlist)
        private PlayListRepo: Repository<Playlist>,
        @InjectRepository(Song)
        private SongRepo: Repository<Song>,
        @InjectRepository(User)
        private UserRepo: Repository<User>
    ) { }

    async createPlaylist(playlistDto: CreatePlaylistDTO): Promise<Playlist> {
        const playList = new Playlist();
        playList.name = playlistDto.name;

        // songs will be the array of ids what we are getting from the DTO object
        const songs = await this.SongRepo.findByIds(playlistDto.songs)
        // set the relation for the songs playlist  entity
        playList.songs = songs

        // a user will be the id of the user we are getting form the request 
        // when we implemented the user authentication this id will become the id of the user who is currently logged in and creating the playlist
        const user = await this.UserRepo.findOneBy({ id: playlistDto.user });
        if (!user) {
            throw new NotFoundException(`User with id ${playlistDto.user} not found`)
        }
        playList.user = user;

        return this.PlayListRepo.save(playList)

    }
}
