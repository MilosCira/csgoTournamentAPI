import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from '../entites/player.entity';
import { getManager, Repository } from 'typeorm';
import { from, map, Observable, switchMap } from 'rxjs';
import { IPlayer } from '../interfaces/player.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/services/auth.service';
import { hash } from 'bcrypt';

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Player)
        private readonly playerRepository: Repository<Player>,
        private auth: AuthService
    ) { }

    //Create a new player into DB
    async createPlayer(
        iplayer: Player
    ) {
        try {
            iplayer.pl_password = await hash(iplayer.pl_password, 10);
            await this.playerRepository.save(iplayer);

        } catch (err: any) {
            console.log(err);


            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    error: 'User with this email alredy exist',
                },
                403
            );

        }
    }

    //Soft delete user from DB insert just 1 into row pl_deleted
    async deleteUser(id: number) {
        await this.playerRepository.update(id, { pl_deleted: 1 })

    }


    //Update user in DB sent a Object of user and update any parametar
    async updateOne(id: number, player: IPlayer): Promise<Observable<any>> {
        player.pl_password = await hash(player.pl_password, 10);
        return from(this.playerRepository.update(id, player)).pipe(
            switchMap(() => this.findUserById(id))
        );
    }

    findUserById(pl_id: number): Observable<any> {
        return from(this.playerRepository.findOne({ where: { pl_id } })).pipe(
            map((user: any) => {
                if (!user) {
                    throw new HttpException(`User not found with id = ${pl_id}`, HttpStatus.NOT_FOUND);
                }
                const { password, ...result } = user;
                delete user.password;
                return result;
            })
        )
    }


    //Return user for sent email
    findUserByEmail(pl_email: any) {
        return this.playerRepository.findOne({ where: { pl_email } });
    }

    //Function for login user if exist in DB
    //Validate user before login
    validateUser(email: any, password: any): Observable<IPlayer> {
        return from(this.findOne(email, password)).pipe(
            switchMap((user: IPlayer) => this.auth.comparePasswords(password, user.pl_password).pipe(
                map((match: boolean) => {
                    if (match) {
                        return user;
                    } else {
                        throw new HttpException('Wrong email or password', HttpStatus.NOT_FOUND);
                    }
                })
            ))
        )
    }
    //Function for login user if exist in DB
    login(user: IPlayer): Observable<any> {
        return this.validateUser(user.pl_email, user.pl_password).pipe(
            switchMap((user: IPlayer) => {
                if (user) {
                    return this.auth.generateJWT(user).pipe(map((jwt: string) => jwt));
                } else {
                    return 'Wrong Credentials';
                }
            })
        )
    }

    //Validate user before login
    async findOne(pl_email: string, password: string): Promise<IPlayer | undefined> {
        try {
            const user = await this.playerRepository.findOne({
                where: { pl_email },
            });
            if (!user) {
                throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
            }
            const isMatch = await bcrypt.compare(password, user!.pl_password);
            if (user && isMatch) {

                return user;
            } else {
                throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
            }
        } catch (err) {
            throw new Error(`Error finding ${err} user ${err.message}`);
        }
    }

}
