import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/config/database/database.module';
import { CuestionariosModule } from './infrastructure/modules/cuestionarios.module';

@Module({
  imports: [
    CuestionariosModule, 
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
