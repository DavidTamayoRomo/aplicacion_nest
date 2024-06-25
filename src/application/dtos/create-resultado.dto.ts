import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateResultadoDto {
  @ApiProperty({ description: 'The code of the result', example: 'R001' })
  @IsString()
  codigo: string;

  @ApiProperty({ description: 'The description of the result', example: 'High score' })
  @IsString()
  descripcion: string;

  @ApiProperty({ description: 'The APK message of the result', example: 'Congratulations!' })
  @IsString()
  mensajeApk: string;

  @ApiProperty({ description: 'The APK image of the result', example: 'image_url' })
  @IsString()
  imagenApk: string;

  @ApiProperty({ description: 'The ID of the related cuestionario', example: 'uuid-v4' })
  @IsUUID()
  cuestionarioId: string;
}
