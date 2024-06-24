import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AuditoriaEntity } from "./auditoria.entity";

@Entity({ name: 'SM_PREGUNTA', schema: 'SM' })
export class Pregunta extends AuditoriaEntity{
    
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid', { name: 'PRE_IDENTIFICADOR' })
    id: string;

    @ApiProperty()
    @Column({ type: 'varchar', length: 60, name: 'PRE_CODIGO' })
    codigo: string;

    @ApiProperty()
    @Column({ type: 'varchar', length: 1000, name: 'PRE_PREGUNTA' })
    pregunta: string;

    @ApiProperty()
    @Column({ type: 'bit', default: true, name: 'PRE_ESTADO' })
    estado: boolean;

}
