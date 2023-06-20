import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { playerRole } from "../interfaces/player.interface";
import * as argon2 from 'argon2';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Player {
    @Unique(['pl_id'])
    @PrimaryGeneratedColumn('increment')
    // @OneToMany(() => Tip_Dok_Atribut, tip => tip.id_atribut_def)
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

    @BeforeInsert()
    async hashPassword() {
        this.pl_password = await argon2.hash(this.pl_password);
    }
}