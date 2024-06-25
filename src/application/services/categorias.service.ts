
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../../domain/entities/categoria.entity';
import { CreateCategoriaDto } from '../dtos/create-categoria.dto';
import { UpdateCategoriaDto } from '../dtos/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    const categoria = this.categoriaRepository.create(createCategoriaDto);
    return this.categoriaRepository.save(categoria);
  }

  findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find({ where: { estado: true } });
  }

  findOne(id: string): Promise<Categoria> {
    return this.categoriaRepository.findOne({ where: { id, estado: true } });
  }

  async update(id: string, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria> {
    const categoria = await this.categoriaRepository.preload({
      id,
      ...updateCategoriaDto,
    });

    if (!categoria) {
      throw new NotFoundException(`Categoria with ID ${id} not found`);
    }

    return this.categoriaRepository.save(categoria);
  }

  async remove(id: string): Promise<void> {
    const categoria = await this.findOne(id);
    if (!categoria) {
      throw new NotFoundException(`Categoria with ID ${id} not found`);
    }
    await this.categoriaRepository.remove(categoria);
  }
}