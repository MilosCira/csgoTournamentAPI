import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from '../entites/player.entity';
import { Repository } from 'typeorm';
import { IPlayer, playerRole } from '../interfaces/player.interface';

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Player)
        private readonly playerRepository: Repository<Player>
    ) { }

    //Create a new player into DB
    async createPlayer(
        iplayer: Player
    ) {
        try {
            const userData = await this.findUserByEmail(iplayer.pl_email);
            console.log(userData);
            if (!userData) {
                await this.playerRepository.save(iplayer);
            } else {
                throw new HttpException(
                    {
                        status: HttpStatus.NOT_ACCEPTABLE,
                        error: 'User with this email alredy exist',
                    },
                    403
                );
            }
        } catch (err: any) {
            console.log(err);

            if (err) {
                throw new HttpException(
                    {
                        status: HttpStatus.FORBIDDEN,
                        error: 'User with this email alredy exist',
                    },
                    403
                );
            }
        }
    }

    findUserById(pl_id: number) {
        return this.playerRepository.findOne({ where: { pl_id } });
    }


    //Return user for sent email
    findUserByEmail(pl_email: any) {
        return this.playerRepository.findOne({ where: { pl_email } });
    }
}
