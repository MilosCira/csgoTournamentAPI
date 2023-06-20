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
        firstName: string,
        lastName: string,
        email: string,
        role: playerRole,
        password: string,
        picture: string
    ) {
        try {
            const userData = await this.findUserByEmail(email);
            console.log(userData);
            if (!userData) {
                const player = new Player();
                player.pl_firstName = firstName;
                player.pl_lastName = lastName;
                player.pl_email = email;
                player.pl_password = password;
                player.pl_role = role;
                player.pl_image = picture;
                // player.pl_password = await hash(player.pl_password, 10);
                await this.playerRepository.save(player);
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
