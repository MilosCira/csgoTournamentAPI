import { Body, Controller, Delete, Header, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Tournament } from '../entites/tournament.entity';
import { TournamentService } from './tournament.service';
@ApiTags('tournament')
@Controller('tournament')
export class TournamentController {
    constructor(private tourSer: TournamentService) { }
    @Header('Catch-Control', 'none')
    @Post('create')
    async createTeam(@Body() tour: Tournament): Promise<void> {
        try {
            await this.tourSer.createTournament(tour);
        } catch (err) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Something went wrong',
                },
                403
            );
        }
    }

    @Put('/:id')
    updateTeam(@Param('id') id: number, @Body() tour: Tournament) {
        return this.tourSer.updateOne(id, tour)
    }
    @Delete(':id')
    deleteUser(@Param('id') id: number) {
        return this.tourSer.deleteTeam(id);
    }
}
