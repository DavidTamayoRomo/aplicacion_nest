import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Respuesta } from '../../domain/entities/respuesta.entity';
import { Pregunta } from '../../domain/entities/pregunta.entity';
import { RespuestasService } from '../../application/services/respuestas.service';
import { RespuestasController } from '../controllers/respuestas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Respuesta, Pregunta])],
  providers: [RespuestasService],
  controllers: [RespuestasController],
})
export class RespuestaModule {}
