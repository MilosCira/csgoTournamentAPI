import {
    Body,
    Controller,
    Get,
    Header,
    HttpException,
    HttpStatus,
    Param,
    Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Player } from '../entites/player.entity';
import { PlayerService } from './player.service';
@ApiTags('players')
@Controller('api')
export class PlayerController {
    constructor(private PlService: PlayerService) { }
    @Header('Catch-Control', 'none')
    @Post('createPlayer')
    async createUser(@Body() IPlayerDTO: Player): Promise<void> {
        await this.PlService.createPlayer(IPlayerDTO);
    }

    @Header('Catch-Control', 'none')
    @Get('player/:id')
    async getPlayerById(@Param('id') id: string) {
        try {
            const pData = await this.PlService.findUserById(+id);
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
}
