import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/config/database/database.module';
import { CuestionariosModule } from './infrastructure/modules/cuestionarios.module';
import { PreguntasModule } from './infrastructure/modules/preguntas.module';
import { CategoriaModule } from './infrastructure/modules/categoria.module';
import { RespuestaModule } from './infrastructure/modules/respuesta.module';
import { RangoResultadoModule } from './infrastructure/modules/rango-resultado.module';

@Module({
  imports: [
    DatabaseModule,
    CuestionariosModule, 
    PreguntasModule,
    CategoriaModule,
    RespuestaModule,
    RangoResultadoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
