import { Body, Controller, Get, Post } from '@nestjs/common';
import { Prisma } from 'prisma/generated/client';
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
  async createWater(@Body() water: Prisma.WaterCreateInput) {
    return await this.waterService.createWater(water);
  }
}
