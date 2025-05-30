import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesService {

  constructor(@InjectRepository(Profile) private profileRepository:Repository<Profile>){}

  async create(createProfileDto: CreateProfileDto) {
    return  await this.profileRepository.save(createProfileDto)
  }

  async findOne(id: number) {
    return await this.profileRepository.findOneBy({id})
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    await  this.profileRepository.update(id,updateProfileDto);
     return this.findOne(id)
  }

  async remove(id: number) {
    return await  this.profileRepository.delete(id);
  }
}
