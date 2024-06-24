import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsDateString, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCuestionarioDto {

    @ApiProperty()
    @IsString()
    @MaxLength(60)
    codigo: string;

    @ApiProperty()
    @IsString()
    @MaxLength(1000)
    descripcion: string;

    @ApiProperty()
    @IsBoolean()
    estado: boolean;

    @ApiProperty()
    @IsDateString()
    fechaInicio: Date;
    
    @ApiProperty()
    @IsDateString()
    @IsOptional()
    fechaFin?: Date;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    tiempoEspera?: number;

}
