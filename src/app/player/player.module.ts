import { Module } from '@nestjs/common';

import { Player } from '../entites/player.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from '../entites/tournament.entity';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

@Module({
    controllers: [PlayerController],
    providers: [PlayerService],
    exports: [PlayerService],
    imports: [TypeOrmModule.forFeature([
        Player,
    ])]
})
export class PlayerModule { }
