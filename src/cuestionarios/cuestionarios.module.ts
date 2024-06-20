import { Module } from '@nestjs/common';
import { CuestionariosService } from './cuestionarios.service';
import { CuestionariosController } from './cuestionarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuestionario } from './entities/cuestionario.entity';

@Module({
  controllers: [CuestionariosController],
  providers: [CuestionariosService],
  imports:[
    TypeOrmModule.forFeature([Cuestionario])
  ]
})
export class CuestionariosModule {}
