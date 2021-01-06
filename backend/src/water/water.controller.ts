import { Controller, Get, Post } from '@nestjs/common';
import { WaterService } from './water.service';

@Controller('water')
export class WaterController {
  constructor(private readonly waterService: WaterService) {}

  @Get()
  async allWater() {
    return this.waterService.waters({
      where: {
        id: {
          gt: 0,
        },
      },
    });
  }

  @Post()
  async createWater() {
    // save water to taböle
  }
}
