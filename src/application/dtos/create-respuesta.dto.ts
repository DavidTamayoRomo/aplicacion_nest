import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsInt, IsBoolean } from 'class-validator';

export class CreateRespuestaDto {
  @ApiProperty({ description: 'The code of the answer', example: 'R001' })
  @IsString()
  codigo: string;

  @ApiProperty({ description: 'The text of the answer', example: 'Yes' })
  @IsString()
  respuesta: string;

  @ApiProperty({ description: 'The value of the answer', example: 10 })
  @IsInt()
  valor: number;

  @ApiProperty({ description: 'The order of the answer', example: 1 })
  @IsInt()
  orden: number;

  @ApiProperty({ description: 'The status of the answer', example: true })
  @IsBoolean()
  estado: boolean;

  @ApiProperty({ description: 'The ID of the related pregunta', example: 'uuid-v4' })
  @IsUUID()
  preguntaId: string;
}
