import { Controller, Get, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { Artist } from './artist.entity';
import { ArtistsService } from './artists.service';

@Controller('artists')
export class ArtistsController {
    constructor(private readonly artistsService: ArtistsService) {}

    @Get(':id')
    async findArtistById(@Param('id', ParseIntPipe) id: number): Promise<Artist> {
        const artist = await this.artistsService.findArtist(id);
        if (!artist) {
            throw new NotFoundException(`Artist with id ${id} not found.`);
        }
        return artist;
    }
}
