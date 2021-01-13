import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Power } from 'src/entity/power.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class PowerService {
  constructor(
    @InjectRepository(Power) private readonly powerRepo: Repository<Power>,
  ) {}

  power(id: string): Promise<Power> {
    return this.powerRepo.findOne(id);
  }

  powers(): Promise<Power[]> {
    return this.powerRepo.find();
  }

  remove(id: string): Promise<DeleteResult> {
    return this.powerRepo.delete(id);
  }

  async create(power: Power): Promise<Power> {
    return this.powerRepo.save(power);
  }
}
