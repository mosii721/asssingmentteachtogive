import {IsNumber,IsString,IsOptional,Min,Max,MinLength,MaxLength} from 'class-validator';

export class CreateBookreviewDto {
    @IsNumber()
    user_id:number;

    @IsNumber()
    book_id:number;

    @IsString()
    @MinLength(10, { message: 'Content must be at least 10 characters long' })
    @MaxLength(1000, { message: 'Content must be at most 1000 characters long' })
    content:string;

    @IsNumber()
    @Min(0)
    @Max(5)
    @IsOptional()
    rating:number; 
}
