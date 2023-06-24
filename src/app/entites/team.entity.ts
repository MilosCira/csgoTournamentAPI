import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { playerRole } from "../interfaces/player.interface";
import * as argon2 from 'argon2';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Player } from "./player.entity";

@Entity()
export class Team {
    @Unique(['team_id'])
    @PrimaryGeneratedColumn('increment')
    team_id: number;

    @Column()
    @ApiProperty()
    team_name: string;

    @Column()
    @ApiProperty()
    team_size: number;

    @Column()
    @ApiProperty()
    team_logo: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    @ApiProperty()
    team_created: Date;

    @Column({ default: 0 })
    @ApiProperty()
    team_deleted: number;

    @Column()
    @ApiProperty()
    pl_id: number;



}