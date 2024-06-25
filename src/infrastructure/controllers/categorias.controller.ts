import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCategoriaDto } from 'src/application/dtos/create-categoria.dto';
import { UpdateCategoriaDto } from 'src/application/dtos/update-categoria.dto';
import { CategoriasService } from 'src/application/services/categorias.service';
import { Categoria } from 'src/domain/entities/categoria.entity';

@ApiTags('Categorias')
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Categoria Creada', type: Categoria })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all categorias with estado true', type: [Categoria] })
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get categoria by ID with estado true', type: Categoria })
  @ApiResponse({ status: 404, description: 'Not Found' })
  findOne(@Param('id') id: string) {
    return this.categoriasService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Categoria Updated', type: Categoria })
  @ApiResponse({ status: 404, description: 'Not Found' })
  update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriasService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Categoria Deleted' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  remove(@Param('id') id: string) {
    return this.categoriasService.remove(id);
  }
}