import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuestionariosController } from '../controllers/cuestionarios.controller';
import { CuestionariosService } from 'src/application/services/cuestionarios.service';
import { Cuestionario } from 'src/domain/entities/cuestionario.entity';

@Module({
  controllers: [CuestionariosController],
  providers: [CuestionariosService],
  imports:[
    TypeOrmModule.forFeature([Cuestionario]),
  ]
})
export class CuestionariosModule {}
