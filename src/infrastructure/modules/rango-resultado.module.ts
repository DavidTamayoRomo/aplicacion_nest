import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RangoResultado } from '../../domain/entities/rango-resultado.entity';
import { Cuestionario } from '../../domain/entities/cuestionario.entity';
import { RangoResultadosService } from '../../application/services/rango-resultados.service';
import { RangoResultadosController } from '../controllers/rango-resultados.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RangoResultado, Cuestionario])],
  providers: [RangoResultadosService],
  controllers: [RangoResultadosController],
})
export class RangoResultadoModule {}
