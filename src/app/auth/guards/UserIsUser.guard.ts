import { Injectable, CanActivate, Inject, forwardRef, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

import { map } from "rxjs/operators";
import { IPlayer } from "src/app/interfaces/player.interface";
import { PlayerService } from "src/app/player/player.service";


@Injectable()
export class UserIsUserGuard implements CanActivate {

    constructor(
        @Inject(forwardRef(() => PlayerService))
        private playerService: PlayerService
    ) {

    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        const params = request.params;
        const user: IPlayer = request.user;
        console.log(user);
        console.log(params);

        return this.playerService.findUserById(params.id).pipe(
            map((user: IPlayer) => {
                console.log(user);

                let hasPermission = false;

                if (user.pl_id === Number(params.id)) {
                    hasPermission = true;
                }

                return user && hasPermission;
            })
        )
    }


}