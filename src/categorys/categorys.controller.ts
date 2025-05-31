import { Controller, Get, Post, Body, Patch, Param, Delete,Query,ParseIntPipe } from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categorys')
export class CategorysController {
  constructor(private readonly categorysService: CategorysService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categorysService.create(createCategoryDto);
  }

  @Get()
  findAll(@Query('name')name?:string) {
    return this.categorysService.findAll(name);
  }

  @Get(':id/books')
  findBooksByCategory(@Param('id', ParseIntPipe) id: number) {
  return this.categorysService.findBooksByCategory(id);
}

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.categorysService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categorysService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.categorysService.remove(id);
  }
}
