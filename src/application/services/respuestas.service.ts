import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Respuesta } from '../../domain/entities/respuesta.entity';
import { CreateRespuestaDto } from '../dtos/create-respuesta.dto';
import { UpdateRespuestaDto } from '../dtos/update-respuesta.dto';
import { Pregunta } from '../../domain/entities/pregunta.entity';

@Injectable()
export class RespuestasService {
  constructor(
    @InjectRepository(Respuesta)
    private readonly respuestaRepository: Repository<Respuesta>,
    @InjectRepository(Pregunta)
    private readonly preguntaRepository: Repository<Pregunta>,
  ) {}

  async create(createRespuestaDto: CreateRespuestaDto): Promise<Respuesta> {
    const { preguntaId, ...rest } = createRespuestaDto;

    const pregunta = await this.preguntaRepository.findOne({ where: { id: preguntaId } });
    if (!pregunta) {
      throw new NotFoundException(`Pregunta with ID ${preguntaId} not found`);
    }

    const respuesta = this.respuestaRepository.create({
      ...rest,
      pregunta,
    });

    return this.respuestaRepository.save(respuesta);
  }

  findAll(): Promise<Respuesta[]> {
    return this.respuestaRepository.find({
      where: { estado: true },
      relations: ['pregunta'],
    });
  }

  findOne(id: string): Promise<Respuesta> {
    return this.respuestaRepository.findOne({
      where: { id, estado: true },
      relations: ['pregunta'],
    });
  }

  findByPreguntaId(preguntaId: string): Promise<Respuesta[]> {
    return this.respuestaRepository.find({
      where: { pregunta: { id: preguntaId }, estado: true },
      relations: ['pregunta'],
    });
  }

  async update(id: string, updateRespuestaDto: UpdateRespuestaDto): Promise<Respuesta> {
    const { preguntaId, ...rest } = updateRespuestaDto;

    const respuesta = await this.respuestaRepository.preload({
      id,
      ...rest,
    });

    if (!respuesta) {
      throw new NotFoundException(`Respuesta with ID ${id} not found`);
    }

    if (preguntaId) {
      const pregunta = await this.preguntaRepository.findOne({ where: { id: preguntaId } });
      if (!pregunta) {
        throw new NotFoundException(`Pregunta with ID ${preguntaId} not found`);
      }
      respuesta.pregunta = pregunta;
    }

    return this.respuestaRepository.save(respuesta);
  }

  async remove(id: string): Promise<void> {
    const respuesta = await this.findOne(id);
    if (!respuesta) {
      throw new NotFoundException(`Respuesta with ID ${id} not found`);
    }
    await this.respuestaRepository.remove(respuesta);
  }
}
