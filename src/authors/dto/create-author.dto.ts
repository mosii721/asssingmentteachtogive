import {  IsString, IsDateString,IsOptional,IsEnum,MinLength,MaxLength,IsNotEmpty } from 'class-validator';
import { Status } from 'src/users/entities/user.entity';


export class CreateAuthorDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2, { message: 'Name must be at least 2 characters long' })
    @MaxLength(100, { message: 'Name must be at most 100 characters long' })
    name:string;
    @IsString()
    @IsOptional()
    @MaxLength(1000, { message: 'Bio must be at most 1000 characters long' })
    bio:string;
    @IsDateString()
    dateOfBirth:string;
    @IsEnum(Status,{
        message:'Status must be either: true, false'
})
    isActive:Status=Status.TRUE;

}
