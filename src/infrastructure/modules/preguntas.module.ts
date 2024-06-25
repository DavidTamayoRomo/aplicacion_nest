import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pregunta } from 'src/domain/entities/pregunta.entity';
import { PreguntasController } from '../controllers/preguntas.controller';
import { PreguntasService } from 'src/application/services/preguntas.service';
import { Cuestionario } from 'src/domain/entities/cuestionario.entity';

@Module({
    controllers: [PreguntasController],
    providers: [PreguntasService],
    imports: [
        TypeOrmModule.forFeature([Pregunta, Cuestionario]),
    ]
})
export class PreguntasModule { }
