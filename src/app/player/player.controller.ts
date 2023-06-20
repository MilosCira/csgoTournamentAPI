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
import { playerRole } from '../interfaces/player.interface';
import { PlayerService } from './player.service';

@Controller('api')
export class PlayerController {
    constructor(private PlService: PlayerService) { }
    @Header('Catch-Control', 'none')
    @Post('createPlayer')
    async createUser(
        @Body('pl_firstName') pl_firstName: string,
        @Body('pl_lastName') pl_lastName: string,
        @Body('pl_email') pl_email: string,
        @Body('pl_role') pl_role: playerRole,
        @Body('pl_password') pl_password: string,
        @Body('pl_image') pl_image: string
    ): Promise<void> {
        await this.PlService.createPlayer(
            pl_firstName,
            pl_lastName,
            pl_email,
            pl_role,
            pl_password,
            pl_image
        );
    }

    @Header('Catch-Control', 'none')
    @Get('player/:id')
    async getPlayerById(@Param() params: { id: number }) {
        try {
            const pData = await this.PlService.findUserById(params.id);
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
