import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AuditoriaEntity } from './auditoria.entity';

@Entity({ name: 'SM_CATEGORIA', schema: 'SM' })
export class Categoria extends AuditoriaEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id: string;

  @Column({ type: 'varchar', length: 100, name: 'CATEGORIA' })
  categoria: string;

  @Column({ type: 'bit', name: 'ESTADO' })
  estado: boolean;
}