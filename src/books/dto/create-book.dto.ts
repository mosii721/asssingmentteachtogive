import {IsString, IsEnum, IsDateString,IsNumber} from 'class-validator';
import { Status } from 'src/users/entities/user.entity';

export class CreateBookDto {
    @IsNumber()
    author_id:number;
    @IsString()
    title:string;
    @IsString()
    description:string;
    @IsDateString()
    publicationYear:string;
    @IsEnum(Status,{
        message:'Status must be either: true, false'
})
    isAvailable:Status=Status.TRUE;
}
