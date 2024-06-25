import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsDateString, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreatePreguntaDto {

    @ApiProperty()
    @IsString()
    @MaxLength(60)
    codigo: string;

    @ApiProperty()
    @IsString()
    @MaxLength(1000)
    pregunta: string;

    @ApiProperty()
    @IsBoolean()
    estado: boolean;

    @ApiProperty({ description: 'The ID of the related cuestionario', example: 'uuid-v4' })
    @IsUUID()
    cuestionarioId: string;

    @ApiProperty({ description: 'The ID of the related categoria', example: 'uuid-v4' })
    @IsUUID()
    categoriaId: string;

}
