import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDTO } from './dto/create-playlist-dto';
import { Playlist } from './playlist.entity';

@Controller('playlists')
export class PlaylistsController {
    constructor(
        private PlaylistsService: PlaylistsService
    ) { }
    @Post()
    createPlaylist(@Body() playlistDto: CreatePlaylistDTO): Promise<Playlist> {
        return this.PlaylistsService.createPlaylist(playlistDto);
    }
}
