import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PlayerModule } from '../player/player.module';
import { JwtAuthGuard } from './guards/jwt-guard';
import { JwtStrategy } from './guards/jwt-strategy';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    forwardRef(() => PlayerModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '10000s' }
      })
    })
  ],
  providers: [AuthService, JwtAuthGuard, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
