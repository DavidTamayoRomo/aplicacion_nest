import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateCuestionarioDto } from 'src/application/dtos/create-cuestionario.dto';
import { UpdateCuestionarioDto } from 'src/application/dtos/update-cuestionario.dto';
import { CuestionariosService } from 'src/application/services/cuestionarios.service';

@Controller('cuestionarios')
export class CuestionariosController {
  constructor(private readonly cuestionariosService: CuestionariosService) {}

  @Post()
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
