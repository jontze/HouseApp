import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Oil } from '../entity/oil.entity';
import { DeepPartial, DeleteResult, Repository } from 'typeorm';

@Injectable()
export class OilService {
  constructor(
    @InjectRepository(Oil) private readonly oilRepo: Repository<Oil>,
  ) {}

  oils(): Promise<Oil[]> {
    return this.oilRepo.find();
  }

  oil(id: string): Promise<Oil> {
    return this.oilRepo.findOne(id);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.oilRepo.delete(id);
  }

  async create(oil: DeepPartial<Oil>): Promise<Oil> {
    return this.oilRepo.save(oil);
  }
}
