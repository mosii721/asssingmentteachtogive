import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { Author } from 'src/authors/entities/author.entity';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private bookRepository:Repository<Book>,
  @InjectRepository(Author) private authorRepository:Repository<Author>){}

  async create(createBookDto: CreateBookDto) {
    const existAuthor  = await this.authorRepository.findOneBy({id: createBookDto.author_id});
       
    if(!existAuthor){
      throw new NotFoundException(`Profile  with  id  ${createBookDto.author_id}  not found`);
    }
    const newBook = this.bookRepository.create({
      title:createBookDto.title,
      description:createBookDto.description,
      publicationYear:createBookDto.publicationYear,
      authors:existAuthor,
    })
    return  await this.bookRepository.save(newBook)
  }

  async findAll(title?: string) {
    if (title) {
      return await this.bookRepository.find({
        where:{title},
        relations:['authors','bookreview']
      }) ;
    }
    return await this.bookRepository.find({relations:['authors','bookreview']});
  }

  async findOne(id: number) {
    return await  this.bookRepository.find({
      where:{id},
        relations:['authors','bookreview']
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    return await this.bookRepository.update(id,updateBookDto);
  }

  async remove(id: number) {
    return await  this.bookRepository.delete(id);
  }
}
