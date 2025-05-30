import {IsString, IsEnum, IsDateString,IsNumber,MinLength,MaxLength} from 'class-validator';
import { Status } from 'src/users/entities/user.entity';

export class CreateBookDto {
    @IsNumber()
    author_id:number;
    @IsString()
    @MinLength(1, { message: 'Title must be at least 1 character long' })
    @MaxLength(200, { message: 'Title must be at most 200 characters long' })
    title:string;
    @IsString()
    @MinLength(10, { message: 'Description must be at least 1 character long' })
    @MaxLength(2000, { message: 'Description must be at most 2000 characters long' })
    description:string;
    @IsDateString()
    publicationYear:string;
    @IsEnum(Status,{
        message:'Status must be either: true, false'
})
    isAvailable:Status=Status.TRUE;
}
