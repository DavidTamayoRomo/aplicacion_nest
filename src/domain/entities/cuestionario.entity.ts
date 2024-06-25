import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AuditoriaEntity } from "./auditoria.entity";
import { Pregunta } from "./pregunta.entity";
import { RangoResultado } from "./rango-resultado.entity";
import { Resultado } from "./resultado.entity";

@Entity({ name: 'SM_CUESTIONARIO', schema: 'SM' })
export class Cuestionario extends AuditoriaEntity {
    
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

    @OneToMany(
        () => Pregunta,
        (pregunta)=> pregunta.cuestionario,
        { cascade:true }
    )
    preguntas?: Pregunta[];

    @OneToMany(
        () => RangoResultado, 
        (rangoResultado) => rangoResultado.cuestionario, 
        { cascade: true }
    )
    rangosResultados?: RangoResultado[];

    @OneToMany(
        () => Resultado, 
        (resultado) => resultado.cuestionario, 
        { cascade: true }
    )
    resultados?: Resultado[];

}
