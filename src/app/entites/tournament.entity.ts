import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { playerRole } from "../interfaces/player.interface";
import { tournamentPasswordJoin } from "../interfaces/tournament.interface";
import { Player } from "./player.entity";


@Entity()
export class Tournament {
    @Unique(['tou_id'])
    @PrimaryGeneratedColumn('increment')
    // @OneToMany(() => Tip_Dok_Atribut, tip => tip.id_atribut_def)
    tou_id: number;

    @Column()
    @ApiProperty()
    tou_name: string;

    @Column()
    @ApiProperty()
    tou_description: string;

    @Column({ nullable: true })
    @ApiProperty()
    tou_image: string;

    @Column()
    @ApiProperty()
    tou_password: string;

    @Column()
    @ApiProperty()
    tou_price: string;

    @Column({ type: 'enum', enum: tournamentPasswordJoin, default: tournamentPasswordJoin.NO, nullable: true })
    @ApiProperty()
    tou_joinPassword?: tournamentPasswordJoin;

    @Column({ type: 'timestamp' })
    @ApiProperty()
    tou_startDate?: Date;

    @Column({ type: 'timestamp' })
    @ApiProperty()
    tou_endDate?: Date;

    @Column()
    @OneToMany(() => Player, pl => pl.pl_id)
    @JoinColumn({ name: "pl_id" })
    pl_id: number;
}