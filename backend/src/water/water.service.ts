import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Water } from '../entity/water.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class WaterService {
  constructor(
    @InjectRepository(Water) private readonly waterRepo: Repository<Water>,
  ) {}

  water(id: string): Promise<Water> {
    return this.waterRepo.findOne(id);
  }

  waters(): Promise<Water[]> {
    return this.waterRepo.find();
  }

  remove(id: string): Promise<DeleteResult> {
    return this.waterRepo.delete(id);
  }

  async create(water: Water): Promise<Water> {
    return this.waterRepo.save(water);
  }
}
