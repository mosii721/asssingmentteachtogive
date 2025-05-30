import { Module } from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CategorysController } from './categorys.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Book } from 'src/books/entities/book.entity';

@Module({
  imports:[DatabaseModule,TypeOrmModule.forFeature([Category,Book])],
  controllers: [CategorysController],
  providers: [CategorysService],
})
export class CategorysModule {}
