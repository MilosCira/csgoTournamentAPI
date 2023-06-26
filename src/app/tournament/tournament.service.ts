import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable, switchMap } from 'rxjs';
import { Repository } from 'typeorm';
import { Tournament } from '../entites/tournament.entity';

@Injectable()
export class TournamentService {
    constructor(@InjectRepository(Tournament)
    private readonly tourRepo: Repository<Tournament>,) {
    }

    createTournament(tour: Tournament) {
        this.tourRepo.save(tour);
    }
    //Update tourn in DB sent a Object of team and update any parametar
    async updateOne(id: number, tour: Tournament): Promise<Observable<any>> {
        return from(this.tourRepo.update(id, tour)).pipe(
            switchMap(() => this.findTournamentById(id))
        );
    }
    async deleteTeam(id: number) {
        await this.tourRepo.update(id, { tou_deleted: 1 });
    }

    findTournamentById(tou_id: number): Observable<any> {
        return from(this.tourRepo.findOne({ where: { tou_id } })).pipe(
            map((tour: any) => {
                if (!tour) {
                    throw new HttpException(
                        `Tournament not found with id = ${tou_id}`,
                        HttpStatus.NOT_FOUND
                    );
                }
                const { ...result } = tour;
                return result;
            })
        );
    }
}
