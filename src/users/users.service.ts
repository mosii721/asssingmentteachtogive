import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { profile } from 'console';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepository:Repository<User>,
  @InjectRepository(Profile) private profileRepository:Repository<Profile>){}

  async create(createUserDto: CreateUserDto) {
    const existProfile  = await this.profileRepository.findOneBy({id: createUserDto.profileid});

    if(!existProfile){
      throw new NotFoundException(`Profile  with  id  ${createUserDto.profileid}  not found`);
    }
    const newUser = this.userRepository.create({
      name: createUserDto.name,
      email:createUserDto.email,
      password: createUserDto.password,
      isActive:createUserDto.isActive,
      profile:existProfile,
    })
    return  await this.userRepository.save(newUser)
  }

  async findAll(name?: string) {
    if (name) {
      return await  this.userRepository.find({
        where:{name:name},
        relations:['profile']
      });
    }
    return await this.userRepository.find({relations:['profile']});
  }

  async findOne(id: number) {
    return await  this.userRepository.find({
      where:{id},
        relations:['profile']
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id,updateUserDto);
  }

  async remove(id: number) {
    return await  this.userRepository.delete(id);
  }
}
