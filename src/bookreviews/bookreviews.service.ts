import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateBookreviewDto } from './dto/create-bookreview.dto';
import { UpdateBookreviewDto } from './dto/update-bookreview.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bookreview } from './entities/bookreview.entity';
import { User } from 'src/users/entities/user.entity';
import { Book } from 'src/books/entities/book.entity';

@Injectable()
export class BookreviewsService {

  constructor(@InjectRepository(Bookreview) private bookreviewRepository:Repository<Bookreview>,
  @InjectRepository(User) private userRepository:Repository<User>,
  @InjectRepository(Book) private bookRepository:Repository<Book>,){}

  async create(createBookreviewDto: CreateBookreviewDto) {
    const existUser  = await this.userRepository.findOneBy({id: createBookreviewDto.user_id});
    const existBook  = await this.bookRepository.findOneBy({id: createBookreviewDto.book_id});

    if(!existUser || !existBook ){
      throw new NotFoundException(`User with  id  ${createBookreviewDto.user_id}  &  ${createBookreviewDto.book_id} not found`);
    }
    const newBookreview = this.bookreviewRepository.create({
      content:createBookreviewDto.content,
      rating:createBookreviewDto.rating,
      users:existUser,
      books:existBook,
    })
    return  await this.bookreviewRepository.save(newBookreview)
  }


  async findOne(id: number) {
    return await  this.bookreviewRepository.find({
      where:{id},
        relations:['users','books']
    });
  }

  async update(id: number, updateBookreviewDto: UpdateBookreviewDto) {
    return await this.bookreviewRepository.update(id,updateBookreviewDto);
  }


  async remove(id: number) {
    return await  this.bookreviewRepository.delete(id);
  }
}
