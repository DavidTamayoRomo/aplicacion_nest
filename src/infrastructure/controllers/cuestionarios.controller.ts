import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCuestionarioDto } from 'src/application/dtos/create-cuestionario.dto';
import { UpdateCuestionarioDto } from 'src/application/dtos/update-cuestionario.dto';
import { CuestionariosService } from 'src/application/services/cuestionarios.service';
import { Cuestionario } from 'src/domain/entities/cuestionario.entity';

@ApiTags('Cuestionarios')
@Controller('cuestionarios')
export class CuestionariosController {
  constructor(private readonly cuestionariosService: CuestionariosService) {}

  @Post()
  @ApiResponse({status:201, description:'Cuestionario Creado', type: Cuestionario})
  @ApiResponse({status:400, description:'Bad request'})
  @ApiResponse({status:403, description:'Forbidden'})
  create(@Body() createCuestionarioDto: CreateCuestionarioDto) {
    return this.cuestionariosService.create(createCuestionarioDto);
  }

  @Get()
  findAll() {
    return this.cuestionariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuestionariosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCuestionarioDto: UpdateCuestionarioDto) {
    return this.cuestionariosService.update(+id, updateCuestionarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cuestionariosService.remove(id);
  }
}
