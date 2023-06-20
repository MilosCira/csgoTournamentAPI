import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { DbModule } from './db/db.module';
import { PlayerModule } from './player/player.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          entities: [__dirname + '/**/*.entity.{js,ts}'],
          autoLoadEntities: true,
        }),
    }),
    DbModule,
    PlayerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
