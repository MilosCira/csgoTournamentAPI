import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { playerRole } from "../interfaces/player.interface";
import * as argon2 from 'argon2';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
export class Player {
    @Unique(['pl_id'])
    @PrimaryGeneratedColumn('increment')
    // @OneToMany(() => Tip_Dok_Atribut, tip => tip.id_atribut_def)
    pl_id: number;

    @Column()
    pl_firstName: string;

    @Column()
    pl_lastName: string;

    @Column()
    @IsNotEmpty()
    pl_password: string;

    @Column({ unique: true })
    @IsEmail()
    pl_email: string;

    @Column({ type: 'enum', enum: playerRole, nullable: true })
    pl_role: playerRole;

    @Column({ nullable: true })
    pl_image: string;

    @BeforeInsert()
    async hashPassword() {
        this.pl_password = await argon2.hash(this.pl_password);
    }
}