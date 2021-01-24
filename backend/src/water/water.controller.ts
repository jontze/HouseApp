import { Body, Controller, Get, Post } from '@nestjs/common';
import { Water } from '../entity/water.entity';
import { WaterService } from './water.service';

@Controller('water')
export class WaterController {
  constructor(private readonly waterService: WaterService) {}

  @Get()
  async allWater() {
    return this.waterService.waters();
  }

  @Post()
  async createWater(@Body() water: Water) {
    return await this.waterService.create(water);
  }
}
