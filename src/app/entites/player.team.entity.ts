import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { playerRole } from "../interfaces/player.interface";
import * as argon2 from 'argon2';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Team } from "./team.entity";
import { Player } from "./player.entity";

@Entity()
export class PlayerTeam {
    @Unique(['pl_team_id'])
    @PrimaryGeneratedColumn('increment')
    pl_team_id: number;

    @Column()
    @ApiProperty()
    pl_id_invited: number;

    @Column()
    @ManyToOne(() => Team, team => team.team_id)
    @JoinColumn({ name: "team_id" })
    @ApiProperty()
    team_id: number;

    @Column({ default: 0 })
    @ApiProperty()
    pl_accept: number;

}