import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pregunta } from 'src/domain/entities/pregunta.entity';
import { CreatePreguntaDto } from '../dtos/create-pregunta.dto';
import { UpdatePreguntaDto } from '../dtos/update-pregunta.dto';
import { Cuestionario } from 'src/domain/entities/cuestionario.entity';
import { Categoria } from 'src/domain/entities/categoria.entity';

@Injectable()
export class PreguntasService {

  constructor(
    @InjectRepository(Pregunta)
    private readonly preguntaRepository: Repository<Pregunta>,
    @InjectRepository(Cuestionario)
    private readonly cuestionarioRepository: Repository<Cuestionario>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) { }

  async create(createPreguntaDto: CreatePreguntaDto): Promise<Pregunta> {
    try {
      const { cuestionarioId, categoriaId, ...rest } = createPreguntaDto;

      const cuestionario = await this.cuestionarioRepository.findOne({ where: { id: cuestionarioId } });
      if (!cuestionario) {
        throw new NotFoundException(`Cuestionario with ID ${cuestionarioId} not found`);
      }

      const categoria = await this.categoriaRepository.findOne({ where: { id: categoriaId } });
      if (!categoria) {
        throw new NotFoundException(`Categoria with ID ${categoriaId} not found`);
      }

      const pregunta = this.preguntaRepository.create({
        ...rest,
        cuestionario,
        categoria
      });

      return await this.preguntaRepository.save(pregunta);
    } catch (error) {
      throw new InternalServerErrorException('Ayuda!');
    }
  }

  async findAll(): Promise<Pregunta[]> {
    try {
      return await this.preguntaRepository.find({
        where: { estado: true },
        relations: ['cuestionario', 'categoria']
      });
    } catch (error) {
      throw new InternalServerErrorException('Ayuda!');
    }
  }

  async findOne(id: string): Promise<Pregunta> {
    try {
      const pregunta = await this.preguntaRepository.findOne({ where: { id, estado: true }, relations: ['cuestionario'] });
      return pregunta;
    } catch (error) {
      throw new InternalServerErrorException('Ayuda!');
    }
  }

  async update(id: string, updatePreguntaDto: UpdatePreguntaDto): Promise<Pregunta> {
    try {
      const { cuestionarioId,categoriaId, ...rest } = updatePreguntaDto;

      const pregunta = await this.preguntaRepository.preload({
        id,
        ...rest,
      });

      if (!pregunta) {
        throw new NotFoundException(`Pregunta with ID ${id} not found`);
      }

      if (cuestionarioId) {
        const cuestionario = await this.cuestionarioRepository.findOne({ where: { id: cuestionarioId } });
        if (!cuestionario) {
          throw new NotFoundException(`Cuestionario with ID ${cuestionarioId} not found`);
        }
        pregunta.cuestionario = cuestionario;
      }

      if (categoriaId) {
        const categoria = await this.categoriaRepository.findOne({ where: { id: categoriaId } });
        if (!categoria) {
          throw new NotFoundException(`Categoria with ID ${categoriaId} not found`);
        }
        pregunta.categoria = categoria;
      }

      return await this.preguntaRepository.save(pregunta);
    } catch (error) {
      throw new InternalServerErrorException('Ayuda!');
    }

  }

  async remove(id: string) {
    try {
      const pregunta = await this.findOne(id);
      if (!pregunta) {
        throw new NotFoundException(`Pregunta with ID ${id} not found`);
      }
      await this.preguntaRepository.remove(pregunta);
      return { ...pregunta, id }
    } catch (error) {
      throw new InternalServerErrorException('Ayuda!');
    }

  }


  async findByCuestionarioId(cuestionarioId: string): Promise<Pregunta[]> {
    return await this.preguntaRepository.find({
      where: { cuestionario: { id: cuestionarioId }, estado: true },
      relations: ['cuestionario', 'categoria'],
    });
  }

  async findByEstado(estado: boolean | null): Promise<Pregunta[]> {
    const whereClause = estado !== null ? { estado } : {};
    return await this.preguntaRepository.find({ where: whereClause, relations: ['cuestionario', 'categoria'] });
  }

}
