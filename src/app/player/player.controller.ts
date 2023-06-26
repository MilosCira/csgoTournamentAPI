import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { log } from 'console';
import { map, Observable, tap } from 'rxjs';
import { JwtAuthGuard } from '../auth/guards/jwt-guard';
import { UserIsUserGuard } from '../auth/guards/UserIsUser.guard';
import { Player } from '../entites/player.entity';
import { IPlayer } from '../interfaces/player.interface';
import { PlayerService } from './player.service';
@ApiTags('players')
@Controller('api')
export class PlayerController {
    constructor(private plService: PlayerService) { }
    @Header('Catch-Control', 'none')
    @Post('createPlayer')
    async createPlayer(@Body() IPlayerDTO: Player): Promise<void> {
        console.log(IPlayerDTO);

        await this.plService.createPlayer(IPlayerDTO);
    }

    @Header('Catch-Control', 'none')
    @Get('player/:id')
    async getPlayerById(@Param('id') id: string) {
        try {
            let pData;
            this.plService.findUserById(+id).pipe((res: any) => {
                return (pData = res);
            });
            if (pData != null) {
                return pData;
            } else {
                throw new HttpException(
                    {
                        status: HttpStatus.BAD_REQUEST,
                        error: 'Player doesn`t exist',
                    },
                    403
                );
            }
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Player doesn`t exist',
                },
                403
            );
        }
    }

    //Login user with jwt
    @Post('auth/login')
    @HttpCode(200)
    login(@Body() user: Player): Observable<any> {

        return this.plService.login(user).pipe(
            map((jwt: string) => {
                return { token: jwt, id: user.pl_id };
            })
        )
    }

    @UseGuards(UserIsUserGuard)
    @Put('player/:id')
    updateUser(@Param('id') id: number, @Body() player: Player) {
        return this.plService.updateOne(id, player)
    }

    @UseGuards(UserIsUserGuard)
    @Delete('users/:id')
    deleteUser(@Param('id') id: number) {
        return this.plService.deleteUser(id);
    }
}
