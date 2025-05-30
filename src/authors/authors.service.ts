import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {

  constructor(@InjectRepository(Author) private authorRepository:Repository<Author>){}

  async create(createAuthorDto: CreateAuthorDto) {
    return  await this.authorRepository.save(createAuthorDto)
  }

  async findAll(name?:string) {
    if (name) {
      return await this.authorRepository.find({
        where:{name},
        relations:['book']
      }) ;
    }
    return await this.authorRepository.find({relations:['book']});
  }

  async findOne(id: number) {
    return await  this.authorRepository.find({
      where:{id},
        relations:['book']
    });
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    await  this.authorRepository.update(id,updateAuthorDto);
    return this.findOne(id)
  }

  async remove(id: number) {
    return await  this.authorRepository.delete(id);
  }
}
