import { PartialType } from '@nestjs/swagger';
import { CreateRangoResultadoDto } from './create-rango-resultado.dto';

export class UpdateRangoResultadoDto extends PartialType(CreateRangoResultadoDto) {}
