import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from 'src/common/constants/connection';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Songs } from './song.entity';

const mockSongsService = {
  findAllSongs() {
    return [{ id: 1, title: "abc", artist: "john" }]
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Songs])],
  controllers: [SongsController],
  providers: [
    // method 1 
    SongsService,

    // method 2 
    // {
    //   provide:SongsService,
    //   useClass:SongsService
    // }

    // method 3
    // {
    //   provide: SongsService,
    //   useValue: mockSongsService
    // }

    // method 4 
    {
      provide: "CONNECTION",
      useValue: connection
    }
  ]
})
export class SongsModule { }
