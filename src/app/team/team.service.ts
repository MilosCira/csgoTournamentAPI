import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
    InjectConnection,
    InjectEntityManager,
    InjectRepository,
} from '@nestjs/typeorm';
import { from, map, Observable, switchMap } from 'rxjs';
import { Connection, EntityManager, Repository } from 'typeorm';
import { PlayerTeam } from '../entites/player.team.entity';
import { Team } from '../entites/team.entity';
import { ITeam } from '../interfaces/team.inferface';

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team)
        private readonly teamRepo: Repository<Team>,
        @InjectConnection() private readonly em: EntityManager
    ) { }

    createTeam(team: Team) {
        this.teamRepo.save(team);
    }

    invitePlayerToTeam(tp: PlayerTeam) {
        return this.teamRepo
            .createQueryBuilder()
            .insert()
            .into(PlayerTeam)
            .values({
                pl_id_invited: tp.pl_id_invited,
                team_id: tp.team_id,
            })
            .execute();
    }

    async getInfoForSender(pl_id: number, pl_inv_id: number) {
        const res = await this.em.query(`
        SELECT A.pl_firstName  as senderName, A.pl_lastName  as senderLastName ,B.pl_firstName as reciverName,B.pl_lastName as reciverLastname, player_team.pl_accept as accepted, team_name,team_size FROM   csgotournament.player_team  join team using(team_id) LEFT JOIN player A ON A.pl_id=team.pl_id 
        LEFT JOIN player B ON B.pl_id=player_team.pl_id_invited where A.pl_id = ${pl_id} and B.pl_id=${pl_inv_id}      
    ;`);
        return res;
    }

    async getTeamByUserCreated(pl_id: number) {
        return await this.teamRepo.find({
            where: [{ pl_id: pl_id }],
        });
    }

    async deleteTeam(id: number) {
        await this.teamRepo.update(id, { team_deleted: 1 });
    }

    findTeamById(team_id: number): Observable<any> {
        return from(this.teamRepo.findOne({ where: { team_id } })).pipe(
            map((team: any) => {
                if (!team) {
                    throw new HttpException(
                        `Tim not found with id = ${team_id}`,
                        HttpStatus.NOT_FOUND
                    );
                }
                const { ...result } = team;
                return result;
            })
        );
    }

    //Accept team
    async acceptTeamInvite(id: number) {
        console.log(id);

        const res = await this.em.query(`UPDATE player_team
        SET pl_accept = 1
        WHERE pl_team_id=${id}; `);
        return res;
    }

    //Update user in DB sent a Object of user and update any parametar
    async updateOne(id: number, team: Team): Promise<Observable<any>> {
        return from(this.teamRepo.update(id, team)).pipe(
            switchMap(() => this.findTeamById(id))
        );
    }
}
