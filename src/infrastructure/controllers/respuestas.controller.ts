import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRespuestaDto } from 'src/application/dtos/create-respuesta.dto';
import { UpdateRespuestaDto } from 'src/application/dtos/update-respuesta.dto';
import { RespuestasService } from 'src/application/services/respuestas.service';
import { Respuesta } from 'src/domain/entities/respuesta.entity';

@ApiTags('Respuestas')
@Controller('respuestas')
export class RespuestasController {
  constructor(private readonly respuestasService: RespuestasService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Respuesta Creada', type: Respuesta })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(@Body() createRespuestaDto: CreateRespuestaDto) {
    return this.respuestasService.create(createRespuestaDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all respuestas with estado true', type: [Respuesta] })
  findAll() {
    return this.respuestasService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get respuesta by ID with estado true', type: Respuesta })
  @ApiResponse({ status: 404, description: 'Not Found' })
  findOne(@Param('id') id: string) {
    return this.respuestasService.findOne(id);
  }

  @Get('/pregunta/:preguntaId')
  @ApiResponse({ status: 200, description: 'Get respuestas by Pregunta ID with estado true', type: [Respuesta] })
  @ApiResponse({ status: 404, description: 'Not Found' })
  findByPreguntaId(@Param('preguntaId') preguntaId: string) {
    return this.respuestasService.findByPreguntaId(preguntaId);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Respuesta Updated', type: Respuesta })
  @ApiResponse({ status: 404, description: 'Not Found' })
  update(@Param('id') id: string, @Body() updateRespuestaDto: UpdateRespuestaDto) {
    return this.respuestasService.update(id, updateRespuestaDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Respuesta Deleted' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  remove(@Param('id') id: string) {
    return this.respuestasService.remove(id);
  }
}
