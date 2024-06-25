import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty({ description: 'The name of the category', example: 'Electronics' })
  @IsString()
  categoria: string;

  @ApiProperty({ description: 'The status of the category', example: true })
  @IsBoolean()
  estado: boolean;
}