import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RangoResultado } from '../../domain/entities/rango-resultado.entity';
import { CreateRangoResultadoDto } from '../dtos/create-rango-resultado.dto';
import { UpdateRangoResultadoDto } from '../dtos/update-rango-resultado.dto';
import { Cuestionario } from '../../domain/entities/cuestionario.entity';

@Injectable()
export class RangoResultadosService {
  constructor(
    @InjectRepository(RangoResultado)
    private readonly rangoResultadoRepository: Repository<RangoResultado>,
    @InjectRepository(Cuestionario)
    private readonly cuestionarioRepository: Repository<Cuestionario>,
  ) {}

  async create(createRangoResultadoDto: CreateRangoResultadoDto): Promise<RangoResultado> {
    const { cuestionarioId, ...rest } = createRangoResultadoDto;

    const cuestionario = await this.cuestionarioRepository.findOne({ where: { id: cuestionarioId } });
    if (!cuestionario) {
      throw new NotFoundException(`Cuestionario with ID ${cuestionarioId} not found`);
    }

    const rangoResultado = this.rangoResultadoRepository.create({
      ...rest,
      cuestionario,
    });

    return this.rangoResultadoRepository.save(rangoResultado);
  }

  findAll(): Promise<RangoResultado[]> {
    return this.rangoResultadoRepository.find({
      where: { estado: true },
      relations: ['cuestionario'],
    });
  }

  findOne(id: string): Promise<RangoResultado> {
    return this.rangoResultadoRepository.findOne({
      where: { id, estado: true },
      relations: ['cuestionario'],
    });
  }

  findByCuestionarioId(cuestionarioId: string): Promise<RangoResultado[]> {
    return this.rangoResultadoRepository.find({
      where: { cuestionario: { id: cuestionarioId }, estado: true },
      relations: ['cuestionario'],
    });
  }

  async update(id: string, updateRangoResultadoDto: UpdateRangoResultadoDto): Promise<RangoResultado> {
    const { cuestionarioId, ...rest } = updateRangoResultadoDto;

    const rangoResultado = await this.rangoResultadoRepository.preload({
      id,
      ...rest,
    });

    if (!rangoResultado) {
      throw new NotFoundException(`RangoResultado with ID ${id} not found`);
    }

    if (cuestionarioId) {
      const cuestionario = await this.cuestionarioRepository.findOne({ where: { id: cuestionarioId } });
      if (!cuestionario) {
        throw new NotFoundException(`Cuestionario with ID ${cuestionarioId} not found`);
      }
      rangoResultado.cuestionario = cuestionario;
    }

    return this.rangoResultadoRepository.save(rangoResultado);
  }

  async remove(id: string): Promise<void> {
    const rangoResultado = await this.findOne(id);
    if (!rangoResultado) {
      throw new NotFoundException(`RangoResultado with ID ${id} not found`);
    }
    await this.rangoResultadoRepository.remove(rangoResultado);
  }
}
