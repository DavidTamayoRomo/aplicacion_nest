import { Module } from '@nestjs/common';
import { CuestionariosModule } from './cuestionarios/cuestionarios.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    CuestionariosModule, 
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
