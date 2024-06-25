import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pregunta } from 'src/domain/entities/pregunta.entity';
import { CreatePreguntaDto } from '../dtos/create-pregunta.dto';
import { UpdatePreguntaDto } from '../dtos/update-pregunta.dto';
import { Cuestionario } from 'src/domain/entities/cuestionario.entity';

@Injectable()
export class PreguntasService {

  constructor(
    @InjectRepository(Pregunta)
    private readonly preguntaRepository: Repository<Pregunta>,
    @InjectRepository(Cuestionario)
    private readonly cuestionarioRepository: Repository<Cuestionario>
  ) { }

  async create(createPreguntaDto: CreatePreguntaDto) {
    try {
      const { cuestionarioId, ...rest } = createPreguntaDto;
      const cuestionario = await this.cuestionarioRepository.findOne({ where: { id: cuestionarioId } });
      if (!cuestionario) {
        throw new NotFoundException(`Cuestionario with ID ${cuestionarioId} not found`);
      }
      const pregunta = this.preguntaRepository.create({
        ...rest,
        cuestionario,
      });
      return await this.preguntaRepository.save(pregunta);
    } catch (error) {
      throw new InternalServerErrorException('Ayuda!');
    }
  }

  async findAll(): Promise<Pregunta[]> {
    try {
      const preguntas = await this.preguntaRepository.find({ relations: ['cuestionario'] });
      return preguntas;
    } catch (error) {
      throw new InternalServerErrorException('Ayuda!');
    }
  }

  async findOne(id: string): Promise<Pregunta> {
    try {
      const pregunta = await this.preguntaRepository.findOne({ where: { id }, relations: ['cuestionario'] });
      return pregunta;
    } catch (error) {
      throw new InternalServerErrorException('Ayuda!');
    }
  }

  async update(id: string, updatePreguntaDto: UpdatePreguntaDto) {
    try {
      const { cuestionarioId, ...rest } = updatePreguntaDto;

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
}
