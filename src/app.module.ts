import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/config/database/database.module';
import { CuestionariosModule } from './infrastructure/modules/cuestionarios.module';
import { PreguntasModule } from './infrastructure/modules/preguntas.module';

@Module({
  imports: [
    CuestionariosModule, 
    PreguntasModule,
    DatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
