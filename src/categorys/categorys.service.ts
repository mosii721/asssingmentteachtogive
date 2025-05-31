import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';


@Injectable()
export class CategorysService {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>,) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return  await this.categoryRepository.save(createCategoryDto)
  }

  async findAll(name?:string) {
    if (name) {
      return await this.categoryRepository.find({
        where:{name},
        relations:['books']
      }) ;
    }
    return await this.categoryRepository.find({relations:['books']});
  }

  async findOne(id: number) {
    return await  this.categoryRepository.find({
      where:{id},
        relations:['books']
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryRepository.update(id,updateCategoryDto);
  }

  async remove(id: number) {
    return await  this.categoryRepository.delete(id);
  }

  async findBooksByCategory(categoryId: number) {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
      relations: ['books'],
    });
    if (!category) throw new NotFoundException('Category not found');
    return category.books;
  }
  
}
