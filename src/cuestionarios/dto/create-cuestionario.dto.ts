import { IsBoolean, IsDate, IsDateString, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCuestionarioDto {

    @IsString()
    @MaxLength(60)
    codigo: string;

    @IsString()
    @MaxLength(1000)
    descripcion: string;

    @IsBoolean()
    estado: boolean;

    @IsDateString()
    fechaInicio: Date;
    
    @IsDateString()
    @IsOptional()
    fechaFin?: Date;

    @IsNumber()
    @IsOptional()
    tiempoEspera?: number;

}
