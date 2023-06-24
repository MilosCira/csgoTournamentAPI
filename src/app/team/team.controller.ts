import { Body, Controller, Delete, Get, Header, HttpException, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserIsUserGuard } from '../auth/guards/UserIsUser.guard';
import { Player } from '../entites/player.entity';
import { PlayerTeam } from '../entites/player.team.entity';
import { Team } from '../entites/team.entity';
import { TeamService } from './team.service';
@ApiTags('team')
@Controller('team')
export class TeamController {
    constructor(private teamSer: TeamService) { }
    @Header('Catch-Control', 'none')
    @Post('create')
    async createTeam(@Body() team: Team): Promise<void> {
        try {
            await this.teamSer.createTeam(team);
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


    @Header('Catch-Control', 'none')
    @Post('sendInvite')
    async sendInvite(@Body() pt: PlayerTeam) {
        let res;
        try {
            res = await this.teamSer.invitePlayerToTeam(pt);
            console.log(res);

        } catch (err) {
            res = err;
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Something went wrong',
                },
                403
            );
        }
        return res;
    }

    @Get('getSenderInfo')
    async getSInfo(@Query('pl_id') pl_id: string, @Query('pl_id_inv') pl_id_inv: string) {


        let result;
        try {
            result = await this.teamSer.getInfoForSender(+pl_id, +pl_id_inv);


            if (result.length < 1) {
                return { mess: 'No active friend requests' }
            }
        } catch (err) {
            result = err;
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Something went wrong',
                },
                403
            );
        }
        console.log(result);
        return result;

    }

    @Get('getUserTeams')
    async getAllTeamsForUser(@Query('pl_id') pl_id: string) {
        let res;
        try {
            res = await this.teamSer.getTeamByUserCreated(+pl_id);
            if (res.length < 1) {
                return { mess: 'No active teams' }
            }
        } catch (err) {
            res = err;
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Something went wrong',
                },
                403
            );
        }
        return res;
    }

    @Put('team/:id')
    updateUser(@Param('id') id: number, @Body() team: Team) {
        return this.teamSer.updateOne(id, team)
    }

    @Delete('team/:id')
    deleteUser(@Param('id') id: number) {
        return this.teamSer.deleteTeam(id);
    }
}
