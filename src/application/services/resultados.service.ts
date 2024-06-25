import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resultado } from '../../domain/entities/resultado.entity';
import { CreateResultadoDto } from '../dtos/create-resultado.dto';
import { UpdateResultadoDto } from '../dtos/update-resultado.dto';
import { Cuestionario } from '../../domain/entities/cuestionario.entity';

@Injectable()
export class ResultadosService {
  constructor(
    @InjectRepository(Resultado)
    private readonly resultadoRepository: Repository<Resultado>,
    @InjectRepository(Cuestionario)
    private readonly cuestionarioRepository: Repository<Cuestionario>,
  ) {}

  async create(createResultadoDto: CreateResultadoDto): Promise<Resultado> {
    const { cuestionarioId, ...rest } = createResultadoDto;

    const cuestionario = await this.cuestionarioRepository.findOne({ where: { id: cuestionarioId } });
    if (!cuestionario) {
      throw new NotFoundException(`Cuestionario with ID ${cuestionarioId} not found`);
    }

    const resultado = this.resultadoRepository.create({
      ...rest,
      cuestionario,
    });

    return this.resultadoRepository.save(resultado);
  }

  findAll(): Promise<Resultado[]> {
    return this.resultadoRepository.find({
      relations: ['cuestionario'],
    });
  }

  findOne(id: string): Promise<Resultado> {
    return this.resultadoRepository.findOne({
      where: { id },
      relations: ['cuestionario'],
    });
  }

  findByCuestionarioId(cuestionarioId: string): Promise<Resultado[]> {
    return this.resultadoRepository.find({
      where: { cuestionario: { id: cuestionarioId } },
      relations: ['cuestionario'],
    });
  }

  async update(id: string, updateResultadoDto: UpdateResultadoDto): Promise<Resultado> {
    const { cuestionarioId, ...rest } = updateResultadoDto;

    const resultado = await this.resultadoRepository.preload({
      id,
      ...rest,
    });

    if (!resultado) {
      throw new NotFoundException(`Resultado with ID ${id} not found`);
    }

    if (cuestionarioId) {
      const cuestionario = await this.cuestionarioRepository.findOne({ where: { id: cuestionarioId } });
      if (!cuestionario) {
        throw new NotFoundException(`Cuestionario with ID ${cuestionarioId} not found`);
      }
      resultado.cuestionario = cuestionario;
    }

    return this.resultadoRepository.save(resultado);
  }

  async remove(id: string): Promise<void> {
    const resultado = await this.findOne(id);
    if (!resultado) {
      throw new NotFoundException(`Resultado with ID ${id} not found`);
    }
    await this.resultadoRepository.remove(resultado);
  }
}
