import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AuditoriaEntity } from './auditoria.entity';
import { Cuestionario } from './cuestionario.entity';

@Entity({ name: 'SM_RESULTADO', schema: 'SM' })
export class Resultado extends AuditoriaEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 60, name: 'RESU_CODIGO' })
  codigo: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 1000, name: 'RESU_DESCRIPCION' })
  descripcion: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 1000, name: 'RESU_MENSAJE_APK' })
  mensajeApk: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 1000, name: 'RESU_IMAGEN_APK' })
  imagenApk: string;

  @ManyToOne(() => Cuestionario, (cuestionario) => cuestionario.resultados)
  @JoinColumn({ name: 'CUESTIONARIO_ID' })
  cuestionario: Cuestionario;
}
