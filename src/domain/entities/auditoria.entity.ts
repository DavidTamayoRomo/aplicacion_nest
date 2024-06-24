import { CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

export abstract class AuditoriaEntity {
  @CreateDateColumn({ name: 'FECHA_CREACION' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'FECHA_MODIFICACION' })
  fechaModificacion: Date;

  @Column({ name: 'USUARIO_CREACION', nullable: true })
  usuarioCreacion: string;

  @Column({ name: 'USUARIO_MODIFICACION', nullable: true })
  usuarioModificacion: string;
}