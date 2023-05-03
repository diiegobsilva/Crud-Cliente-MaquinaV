import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name:"cliente"})
export class Cliente {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    nome: string;

    @Column({nullable: false})
    email: string;

    @Column({nullable: false})
    cargo: string;

}
