import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pregunta } from 'src/domain/entities/pregunta.entity';

@Module({
    controllers: [],
    providers: [],
    imports: [
        TypeOrmModule.forFeature([Pregunta]),
    ]
})
export class PreguntasModule { }
