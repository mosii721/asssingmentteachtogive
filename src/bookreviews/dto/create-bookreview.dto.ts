import {IsNumber,IsString,IsOptional,Min,Max} from 'class-validator';

export class CreateBookreviewDto {
    @IsNumber()
    user_id:number;

    @IsNumber()
    book_id:number;

    @IsString()
    content:string;

    @IsNumber()
    @Min(0)
    @Max(5)
    @IsOptional()
    rating:number; 
}
