import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AuditoriaEntity } from "./auditoria.entity";
import { Cuestionario } from "./cuestionario.entity";
import { Categoria } from "./categoria.entity";

@Entity({ name: 'SM_PREGUNTA', schema: 'SM' })
export class Pregunta extends AuditoriaEntity{
    
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid', { name: 'IDENTIFICADOR' })
    id: string;

    @ApiProperty()
    @Column({ type: 'varchar', length: 60, name: 'CODIGO' })
    codigo: string;

    @ApiProperty()
    @Column({ type: 'varchar', length: 1000, name: 'PREGUNTA' })
    pregunta: string;

    @ApiProperty()
    @Column({ type: 'bit', default: true, name: 'ESTADO' })
    estado: boolean;

    @ManyToOne(
        () => Cuestionario,
        (cuestionario) => cuestionario.preguntas
    )
    @JoinColumn({ name: 'CUESTIONARIO_ID' })
    cuestionario: Cuestionario;


    @ManyToOne(
        () => Categoria
    )
    @JoinColumn({ name: 'CATEGORIA_ID' })
    categoria: Categoria;

}
