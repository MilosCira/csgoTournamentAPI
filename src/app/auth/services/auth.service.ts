import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, from, of } from 'rxjs';
import { hash, compare } from 'bcrypt'
import { IPlayer } from 'src/app/interfaces/player.interface';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService) { }

    generateJWT(user: IPlayer): Observable<string> {
        return from(this.jwtService.signAsync({ user }));
    }

    comparePasswords(newPassword: string, passwortHash: string): Observable<any> {
        return from(compare(newPassword, passwortHash));
    }

}