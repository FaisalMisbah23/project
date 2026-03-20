import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { User } from '../users/user.entity';
import { Artist } from '../artists/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Artist])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
