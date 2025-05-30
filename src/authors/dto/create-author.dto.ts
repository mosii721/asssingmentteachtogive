import {  IsString, IsDateString, IsNumber,IsOptional,IsEnum } from 'class-validator';
import { Status } from 'src/users/entities/user.entity';


export class CreateAuthorDto {
    @IsString()
    name:string;
    @IsString()
    @IsOptional()
    bio:string;
    @IsDateString()
    dateOfBirth:string;
    @IsEnum(Status,{
        message:'Status must be either: true, false'
})
    isActive:Status=Status.TRUE;

}
