import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AuditoriaEntity } from './auditoria.entity';
import { Pregunta } from './pregunta.entity';

@Entity({ name: 'SM_RESPUESTA', schema: 'SM' })
export class Respuesta extends AuditoriaEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 60, name: 'CODIGO' })
  codigo: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 1000, name: 'RESPUESTA' })
  respuesta: string;

  @ApiProperty()
  @Column({ type: 'int', name: 'VALOR' })
  valor: number;

  @ApiProperty()
  @Column({ type: 'int', name: 'ORDEN' })
  orden: number;

  @ApiProperty()
  @Column({ type: 'bit', default: true, name: 'ESTADO' })
  estado: boolean;

  @ManyToOne(
    () => Pregunta, 
    (pregunta) => pregunta.respuestas
  )
  @JoinColumn({ name: 'PREGUNTA_ID' })
  pregunta: Pregunta;
}
