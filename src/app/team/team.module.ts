import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from '../entites/team.entity';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    providers: [TeamService],
    controllers: [TeamController],
    imports: [TypeOrmModule.forFeature([
        Team
    ]),

    ]
})
export class TeamModule { }
