import {IsString, IsOptional, IsDateString, IsUrl} from 'class-validator';


export class CreateProfileDto {
        @IsString()
        @IsOptional()
        bio:string;
        @IsUrl()
        @IsOptional()
        avatar:string;
        @IsDateString()
        @IsOptional()
        dateOfBirth:string;
        @IsString()
        @IsOptional()
        location:string;
}
