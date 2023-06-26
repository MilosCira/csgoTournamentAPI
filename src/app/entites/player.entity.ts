import { BeforeInsert, Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { playerRole } from "../interfaces/player.interface";
import * as argon2 from 'argon2';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Tournament } from "./tournament.entity";
import { ITournament } from "../interfaces/tournament.interface";

@Entity()
export class Player {



    @Unique(['pl_id'])
    @PrimaryGeneratedColumn('increment')

    pl_id: number;

    @Column()

    @ApiProperty()
    pl_firstName: string;

    @Column()
    @ApiProperty()
    pl_lastName: string;

    @Column()
    @IsNotEmpty()
    @ApiProperty()
    pl_password: string;

    @Column({ unique: true })
    @IsEmail()
    @ApiProperty()
    pl_email: string;

    @Column({ type: 'enum', enum: playerRole, nullable: true })
    @ApiProperty()
    pl_role: playerRole;

    @Column({ nullable: true })
    @ApiProperty()
    pl_image: string;

    @Column({ default: 0 })
    @ApiProperty()
    pl_deleted: number;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    @ApiProperty()
    pl_created: Date;



}