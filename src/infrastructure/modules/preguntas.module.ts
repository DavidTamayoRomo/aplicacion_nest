import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pregunta } from 'src/domain/entities/pregunta.entity';
import { PreguntasController } from '../controllers/preguntas.controller';
import { PreguntasService } from 'src/application/services/preguntas.service';
import { Cuestionario } from 'src/domain/entities/cuestionario.entity';
import { Categoria } from 'src/domain/entities/categoria.entity';

@Module({
    controllers: [PreguntasController],
    providers: [PreguntasService],
    imports: [
        TypeOrmModule.forFeature([Pregunta, Cuestionario, Categoria]),
    ]
})
export class PreguntasModule { }
