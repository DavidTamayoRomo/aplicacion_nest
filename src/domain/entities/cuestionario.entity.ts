import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AuditoriaEntity } from "./auditoria.entity";

@Entity({ name: 'SM_CUESTIONARIO', schema: 'SM' })
export class Cuestionario  {
    
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid', { name: 'ID' })
    id: string;

    @ApiProperty()
    @Column({ type: 'varchar', length: 60, name: 'CODIGO' })
    codigo: string;

    @ApiProperty()
    @Column({ type: 'varchar', length: 1000, name: 'DESCRIPCION' })
    descripcion: string;

    @ApiProperty()
    @Column({ type: 'bit', default: true, name: 'ESTADO' })
    estado: boolean;

    @ApiProperty()
    @Column({ type: 'date', name: 'FECHA_INICIO' })
    fechaInicio: Date;

    @ApiProperty()
    @Column({ type: 'date', nullable: true, name: 'FECHA_FIN' })
    fechaFin: Date;

    @ApiProperty()
    @Column({ type: 'int', nullable: true, name: 'TIEMPO_ESPERA' })
    tiempoEspera: number;

    /* @BeforeInsert()
    @BeforeUpdate()
    validateDates() {
        if (this.fechaFin && this.fechaFin < this.fechaInicio) {
            throw new Error('La fecha de fin no puede ser menor que la fecha de inicio.');
        }
    } */

}
