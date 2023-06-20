import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { playerRole } from "../interfaces/player.interface";
import { tournamentPasswordJoin } from "../interfaces/tournament.interface";


@Entity()
export class Tournament {
    @Unique(['tou_id'])
    @PrimaryGeneratedColumn('increment')
    // @OneToMany(() => Tip_Dok_Atribut, tip => tip.id_atribut_def)
    tou_id?: number;

    @Column()
    tou_name?: string;

    @Column()
    tou_description?: string;

    @Column({ nullable: true })
    tou_image?: string;

    @Column()
    tou_password?: string;

    @Column()
    tou_price?: string;

    @Column({ type: 'enum', enum: tournamentPasswordJoin, default: tournamentPasswordJoin.NO, nullable: true })
    tou_joinPassword?: tournamentPasswordJoin;

    @Column({ type: 'timestamp' })
    tou_startDate?: Date;

    @Column({ type: 'timestamp' })
    tou_endDate?: Date;
}