import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resultado } from '../../domain/entities/resultado.entity';
import { Cuestionario } from '../../domain/entities/cuestionario.entity';
import { ResultadosService } from '../../application/services/resultados.service';
import { ResultadosController } from '../controllers/resultados.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Resultado, Cuestionario])],
  providers: [ResultadosService],
  controllers: [ResultadosController],
})
export class ResultadoModule {}
