import { Module } from '@nestjs/common';

import { Player } from '../entites/player.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { AuthModule } from '../auth/auth.module';
import { PlayerTeam } from '../entites/player.team.entity';

@Module({
    controllers: [PlayerController],
    providers: [PlayerService,],
    exports: [PlayerService],
    imports: [TypeOrmModule.forFeature([
        Player,
        PlayerTeam
    ]),
        AuthModule
    ]
})
export class PlayerModule { }
