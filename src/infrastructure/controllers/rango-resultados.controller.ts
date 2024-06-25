import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRangoResultadoDto } from 'src/application/dtos/create-rango-resultado.dto';
import { UpdateRangoResultadoDto } from 'src/application/dtos/update-rango-resultado.dto';
import { RangoResultadosService } from 'src/application/services/rango-resultados.service';
import { RangoResultado } from 'src/domain/entities/rango-resultado.entity';

@ApiTags('RangoResultados')
@Controller('rango-resultados')
export class RangoResultadosController {
  constructor(private readonly rangoResultadosService: RangoResultadosService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'RangoResultado Creado', type: RangoResultado })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(@Body() createRangoResultadoDto: CreateRangoResultadoDto) {
    return this.rangoResultadosService.create(createRangoResultadoDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all rangoResultados with estado true', type: [RangoResultado] })
  findAll() {
    return this.rangoResultadosService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get rangoResultado by ID with estado true', type: RangoResultado })
  @ApiResponse({ status: 404, description: 'Not Found' })
  findOne(@Param('id') id: string) {
    return this.rangoResultadosService.findOne(id);
  }

  @Get('/cuestionario/:cuestionarioId')
  @ApiResponse({ status: 200, description: 'Get rangoResultados by Cuestionario ID with estado true', type: [RangoResultado] })
  @ApiResponse({ status: 404, description: 'Not Found' })
  findByCuestionarioId(@Param('cuestionarioId') cuestionarioId: string) {
    return this.rangoResultadosService.findByCuestionarioId(cuestionarioId);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'RangoResultado Updated', type: RangoResultado })
  @ApiResponse({ status: 404, description: 'Not Found' })
  update(@Param('id') id: string, @Body() updateRangoResultadoDto: UpdateRangoResultadoDto) {
    return this.rangoResultadosService.update(id, updateRangoResultadoDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'RangoResultado Deleted' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  remove(@Param('id') id: string) {
    return this.rangoResultadosService.remove(id);
  }
}
