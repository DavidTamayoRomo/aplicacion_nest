import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/config/database/database.module';
import { CuestionariosModule } from './infrastructure/modules/cuestionarios.module';
import { PreguntasModule } from './infrastructure/modules/preguntas.module';
import { CategoriaModule } from './infrastructure/modules/categoria.module';

@Module({
  imports: [
    CuestionariosModule, 
    PreguntasModule,
    CategoriaModule,
    DatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
