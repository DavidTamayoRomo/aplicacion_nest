import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsDecimal, IsBoolean } from 'class-validator';

export class CreateRangoResultadoDto {
  @ApiProperty({ description: 'The code of the range', example: 'RR001' })
  @IsString()
  codigoRango: string;

  @ApiProperty({ description: 'The initial score of the range', example: 0.00 })
  @IsDecimal()
  puntajeInicial: number;

  @ApiProperty({ description: 'The description of the result', example: 'Low range' })
  @IsString()
  descripcionResultado: string;

  @ApiProperty({ description: 'The status of the range', example: true })
  @IsBoolean()
  estado: boolean;

  @ApiProperty({ description: 'The ID of the related cuestionario', example: 'uuid-v4' })
  @IsUUID()
  cuestionarioId: string;
}
