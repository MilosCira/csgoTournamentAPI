import { ApiProperty } from "@nestjs/swagger";
import { MaxLength } from "class-validator";
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
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

    @Column({ type: 'varchar', length: 500 })

    @ApiProperty()
    tou_description: string;

    @Column({ nullable: true })
    @ApiProperty()
    tou_image: string;

    @Column({ nullable: true })
    @ApiProperty()
    tou_password: string;

    @Column()
    @ApiProperty()
    tou_price: string;

    @Column({ default: false })
    @ApiProperty()
    tou_joinPassword?: boolean;

    @Column({ type: 'timestamp' })
    @ApiProperty()
    tou_startDate?: Date;

    @Column({ type: 'timestamp' })
    @ApiProperty()
    tou_endDate?: Date;

    @Column({ default: 0 })
    @ApiProperty()
    tou_deleted: number;


    @Column()
    @ApiProperty()

    pl_id: number;
}