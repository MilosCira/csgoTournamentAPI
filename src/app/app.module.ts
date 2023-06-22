import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { DbModule } from './db/db.module';
import { PlayerModule } from './player/player.module';
import { ConfigModule } from '@nestjs/config';
import { TournamentModule } from './tournament/tournament.module';
import { TeamController } from './team/team.controller';
import { TeamService } from './team/team.service';
import { TeamModule } from './team/team.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          entities: [__dirname + '/**/*.entity.{js,ts}'],
          autoLoadEntities: true,
        }),
    }),
    DbModule,
    PlayerModule,
    TournamentModule,
    TeamModule
  ],
  controllers: [AppController, TeamController],
  providers: [AppService, TeamService],
})
export class AppModule { }
