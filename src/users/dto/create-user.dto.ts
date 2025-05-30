import {  IsString, IsNumber,IsEmail,IsEnum,IsNotEmpty,MinLength,MaxLength,Matches } from 'class-validator';
import { Status } from '../entities/user.entity';


export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(2, { message: 'Name must be at least 2 characters long' })
    @MaxLength(50, { message: 'Name must be at most 50 characters long' })
    @Matches(/^[a-zA-Z0-9 ]+$/, {
        message: 'Name must be alphanumeric and can contain spaces',
    })
    name:string;
    @IsEmail()
    email:string;
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/(?=.*[a-z])/, {
        message: 'Password must contain at least one lowercase letter',
    })
    @Matches(/(?=.*[A-Z])/, {
        message: 'Password must contain at least one uppercase letter',
    })
    @Matches(/(?=.*\d)/, {
        message: 'Password must contain at least one number',
    })
    password:string;
    @IsEnum(Status,{
        message:'Status must be either: true, false'
})
    isActive:Status=Status.TRUE;

    @IsNumber()
    profileid:number;
}
