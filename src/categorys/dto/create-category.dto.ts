import {IsString, MinLength,MaxLength} from 'class-validator';

export class CreateCategoryDto {
        @IsString()
        @MinLength(2, { message: 'Category must be at least 2 characters long' })
        @MaxLength(50, { message: 'Name must be at most 50 characters long' })
        name:string;
        @IsString()
        description:string;
}
