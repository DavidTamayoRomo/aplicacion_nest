import { Module } from '@nestjs/common';
import { CuestionariosService } from './cuestionarios.service';
import { CuestionariosController } from './cuestionarios.controller';

@Module({
  controllers: [CuestionariosController],
  providers: [CuestionariosService],
})
export class CuestionariosModule {}
