import { Module } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';
import { Tournament } from '../entites/tournament.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [TournamentService],
  controllers: [TournamentController],
  imports: [TypeOrmModule.forFeature([
    Tournament,
  ]),]
})
export class TournamentModule { }
