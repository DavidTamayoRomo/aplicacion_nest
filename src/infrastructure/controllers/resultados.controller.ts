import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateResultadoDto } from 'src/application/dtos/create-resultado.dto';
import { UpdateResultadoDto } from 'src/application/dtos/update-resultado.dto';
import { ResultadosService } from 'src/application/services/resultados.service';
import { Resultado } from 'src/domain/entities/resultado.entity';

@ApiTags('Resultados')
@Controller('resultados')
export class ResultadosController {
  constructor(private readonly resultadosService: ResultadosService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Resultado Creado', type: Resultado })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(@Body() createResultadoDto: CreateResultadoDto) {
    return this.resultadosService.create(createResultadoDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all resultados', type: [Resultado] })
  findAll() {
    return this.resultadosService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get resultado by ID', type: Resultado })
  @ApiResponse({ status: 404, description: 'Not Found' })
  findOne(@Param('id') id: string) {
    return this.resultadosService.findOne(id);
  }

  @Get('/cuestionario/:cuestionarioId')
  @ApiResponse({ status: 200, description: 'Get resultados by Cuestionario ID', type: [Resultado] })
  @ApiResponse({ status: 404, description: 'Not Found' })
  findByCuestionarioId(@Param('cuestionarioId') cuestionarioId: string) {
    return this.resultadosService.findByCuestionarioId(cuestionarioId);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Resultado Updated', type: Resultado })
  @ApiResponse({ status: 404, description: 'Not Found' })
  update(@Param('id') id: string, @Body() updateResultadoDto: UpdateResultadoDto) {
    return this.resultadosService.update(id, updateResultadoDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Resultado Deleted' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  remove(@Param('id') id: string) {
    return this.resultadosService.remove(id);
  }
}
