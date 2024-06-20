import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCuestionarioDto } from './dto/create-cuestionario.dto';
import { UpdateCuestionarioDto } from './dto/update-cuestionario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cuestionario } from './entities/cuestionario.entity';

@Injectable()
export class CuestionariosService {

  constructor(
    @InjectRepository(Cuestionario)
    private readonly cuestionarioRepository: Repository<Cuestionario>
  ) { }

  async create(createCuestionarioDto: CreateCuestionarioDto):Promise<CreateCuestionarioDto>{
    try {
      const cuestionario = this.cuestionarioRepository.create(createCuestionarioDto);
      await this.cuestionarioRepository.save(cuestionario);
      return cuestionario;
    } catch (error) {
      throw new InternalServerErrorException('Ayuda!');
    }
  }

  async findAll():Promise<Cuestionario[]>{
    try {
      const cuestionarios = await this.cuestionarioRepository.find();
      return cuestionarios;
    } catch (error) {
      throw new InternalServerErrorException('Ayuda!');
    }
  }

  async findOne(id: string):Promise<Cuestionario> {
    try {
      const cuestionario = await this.cuestionarioRepository.findOneBy({id});
      return cuestionario;
    } catch (error) {
      throw new InternalServerErrorException('Ayuda!');
    }
  }

  async update(id: number, updateCuestionarioDto: UpdateCuestionarioDto) {
    const cuestionario = await this.cuestionarioRepository.preload(updateCuestionarioDto);
    if(!cuestionario){
      throw new InternalServerErrorException('No existe el cuestionario');
    }
    return await this.cuestionarioRepository.save(cuestionario);
  }

  async remove(id: string) {
    const cuestionario = await this.cuestionarioRepository.findOneBy({id});
    await this.cuestionarioRepository.remove(cuestionario);
    return {...cuestionario, id}
  }
}
