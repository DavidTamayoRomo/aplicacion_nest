import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AuditoriaEntity } from './auditoria.entity';
import { Cuestionario } from './cuestionario.entity';

@Entity({ name: 'SM_RANGO_RESULTADO', schema: 'SM' })
export class RangoResultado extends AuditoriaEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 60, name: 'RRES_CODIGO_RANGO' })
  codigoRango: string;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'RRES_PUNTAJE_INICIAL' })
  puntajeInicial: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 1000, name: 'RRES_DESCRIPCION_RESULTADO' })
  descripcionResultado: string;

  @ApiProperty()
  @Column({ type: 'bit', default: true, name: 'RRES_ESTADO' })
  estado: boolean;

  @ManyToOne(() => Cuestionario, (cuestionario) => cuestionario.rangosResultados)
  @JoinColumn({ name: 'CUESTIONARIO_ID' })
  cuestionario: Cuestionario;
}
