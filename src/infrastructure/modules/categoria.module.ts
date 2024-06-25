import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from '../../domain/entities/categoria.entity';
import { CategoriasService } from '../../application/services/categorias.service';
import { CategoriasController } from '../controllers/categorias.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  providers: [CategoriasService],
  controllers: [CategoriasController],
})
export class CategoriaModule {}