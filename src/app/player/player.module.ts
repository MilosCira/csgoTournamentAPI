import { Module } from '@nestjs/common';

import { Player } from '../entites/player.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    controllers: [PlayerController],
    providers: [PlayerService,],
    exports: [PlayerService],
    imports: [TypeOrmModule.forFeature([
        Player,
    ]),
        AuthModule
    ]
})
export class PlayerModule { }
