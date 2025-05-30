import {IsString, IsEnum, IsDateString,IsNumber} from 'class-validator';

export class CreateCategoryDto {
        @IsString()
        name:string;
        @IsString()
        description:string;
}
