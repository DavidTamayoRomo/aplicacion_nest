import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePreguntaDto } from 'src/application/dtos/create-pregunta.dto';
import { UpdatePreguntaDto } from 'src/application/dtos/update-pregunta.dto';
import { PreguntasService } from 'src/application/services/preguntas.service';
import { Pregunta } from 'src/domain/entities/pregunta.entity';

@ApiTags('Preguntas')
@Controller('preguntas')
export class PreguntasController {
  constructor(private readonly preguntasService: PreguntasService) {}

  @Post()
  @ApiResponse({status:201, description:'Pregunta Creada', type: Pregunta})
  @ApiResponse({status:400, description:'Bad request'})
  @ApiResponse({status:403, description:'Forbidden'})
  create(@Body() createPreguntaDto: CreatePreguntaDto) {
    return this.preguntasService.create(createPreguntaDto);
  }

  @Get()
  findAll() {
    return this.preguntasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preguntasService.findOne(id);
  }

  @Get('/estado')
  @ApiResponse({ status: 200, description: 'Get preguntas by estado', type: [Pregunta] })
  findByEstado(@Query('estado') estado: string) {
    const parsedEstado = estado === 'true' ? true : estado === 'false' ? false : null;
    return this.preguntasService.findByEstado(parsedEstado);
  }

  @Get('/cuestionario/:cuestionarioId')
  @ApiResponse({ status: 200, description: 'Get preguntas by Cuestionario ID', type: [Pregunta] })
  @ApiResponse({ status: 404, description: 'Not Found' })
  findByCuestionarioId(@Param('cuestionarioId') cuestionarioId: string) {
    return this.preguntasService.findByCuestionarioId(cuestionarioId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePreguntaDto: UpdatePreguntaDto) {
    return this.preguntasService.update(id, updatePreguntaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preguntasService.remove(id);
  }
}
