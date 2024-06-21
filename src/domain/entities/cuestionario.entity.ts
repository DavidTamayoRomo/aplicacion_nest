import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'CUESTIONARIO', schema: 'SM' })
export class Cuestionario {
    @PrimaryGeneratedColumn('uuid', { name: 'ID' })
    id: string;

    @Column({ type: 'varchar', length: 60, name: 'CODIGO' })
    codigo: string;

    @Column({ type: 'varchar', length: 1000, name: 'DESCRIPCION' })
    descripcion: string;

    @Column({ type: 'bit', default: true, name: 'ESTADO' })
    estado: boolean;

    @Column({ type: 'date', name: 'FECHA_INICIO' })
    fechaInicio: Date;

    @Column({ type: 'date', nullable: true, name: 'FECHA_FIN' })
    fechaFin: Date;

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
